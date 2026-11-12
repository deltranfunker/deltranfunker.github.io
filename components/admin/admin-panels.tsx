'use client'

import { useEffect, useId, useState, type FormEvent, type ChangeEvent } from 'react'
import { Check, Upload } from 'lucide-react'
import useSWR from 'swr'
import EventsEditor from '@/components/admin/events-editor'
import { fetchAdminSettings, saveSiteSettings, uploadContentMedia } from '@/lib/site-content-api'
import {
  DEFAULT_SITE_SETTINGS,
  SITE_LANGUAGES,
  type AboutCopy,
  type Locale,
  type SiteSettings,
} from '@/lib/site-content'

export type AdminSection = 'hero' | 'events' | 'about' | 'contact'

export function AdminPanels({ section }: { section: AdminSection }) {
  if (section === 'events') return <EventsEditor />
  return <SettingsWorkspace section={section} />
}

function SettingsWorkspace({ section }: { section: Exclude<AdminSection, 'events'> }) {
  const { data: settings = DEFAULT_SITE_SETTINGS, error, isLoading, mutate } = useSWR('deltran-admin-settings', fetchAdminSettings, {
    fallbackData: DEFAULT_SITE_SETTINGS,
    shouldRetryOnError: false,
  })

  async function save(next: SiteSettings) {
    const saved = await saveSiteSettings(next)
    await mutate(saved, false)
  }

  if (error) return <div className="admin-card admin-error" role="alert">Could not load settings. Confirm the signed-in account has admin access.</div>

  const props = { settings, loading: isLoading, onSave: save }
  if (section === 'hero') return <HeroSettingsPanel {...props} />
  if (section === 'about') return <AboutSettingsPanel {...props} />
  return <ContactSettingsPanel {...props} />
}

type SettingsPanelProps = {
  settings: SiteSettings
  loading: boolean
  onSave: (settings: SiteSettings) => Promise<void>
}

function useSettingsDraft(settings: SiteSettings) {
  const [draft, setDraft] = useState(settings)
  useEffect(() => setDraft(settings), [settings])
  return [draft, setDraft] as const
}

function SettingsHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="admin-panel-heading"><span className="admin-kicker">{eyebrow}</span><h2>{title}</h2><p>{description}</p></header>
}

function SaveButton({ saving, loading }: { saving: boolean; loading: boolean }) {
  return <button className="admin-button admin-button-primary" type="submit" disabled={saving || loading}><Check aria-hidden="true" /> {saving ? 'Saving…' : 'Save changes'}</button>
}

function LanguageTabs({ locale, onChange }: { locale: Locale; onChange: (locale: Locale) => void }) {
  return <div className="admin-language-tabs" role="group" aria-label="Choose language">{SITE_LANGUAGES.map((language) => <button key={language.code} type="button" aria-pressed={locale === language.code} className={locale === language.code ? 'is-active' : ''} onClick={() => onChange(language.code)}>{language.label}</button>)}</div>
}

function HeroSettingsPanel({ settings, loading, onSave }: SettingsPanelProps) {
  const [draft, setDraft] = useSettingsDraft(settings)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const inputId = useId()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      await onSave(draft)
      setMessage('Hero settings saved.')
    } catch {
      setMessage('Could not save the hero settings.')
    } finally {
      setSaving(false)
    }
  }

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0]
    event.currentTarget.value = ''
    if (!file) return
    setUploading(true)
    setMessage('')
    try {
      const uploaded = await uploadContentMedia(file, 'hero')
      setDraft((current) => ({ ...current, hero_media_url: uploaded.url, hero_media_type: uploaded.type }))
      setMessage('Upload complete. Save changes to publish this background.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Media upload failed.')
    } finally {
      setUploading(false)
    }
  }

  return <div className="admin-panel-stack"><SettingsHeading eyebrow="01 / HERO" title="Set the scene." description="Choose a still or looping video behind the hero, then tune the existing CRT texture." />
    <form className="admin-card admin-form" onSubmit={handleSubmit}>
      <div className="admin-field"><span className="admin-label">Background media</span>
        <div className="admin-media-preview">{draft.hero_media_url ? (draft.hero_media_type === 'video' ? <video src={draft.hero_media_url} controls muted playsInline /> : <img src={draft.hero_media_url} alt="Current hero background preview" />) : <div className="admin-media-empty"><span>NO CUSTOM BACKGROUND</span><small>The original animated gradient remains active.</small></div>}</div>
        <label className="admin-file-picker" htmlFor={inputId}><input id={inputId} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4,video/webm" onChange={handleFile} disabled={uploading || loading} /><span><Upload aria-hidden="true" /> {uploading ? 'Uploading…' : 'Upload image or video'}</span><small>JPG, PNG, WebP, GIF, AVIF, MP4, or WebM · max 50 MB</small></label>
        {draft.hero_media_url && <button className="admin-text-button" type="button" onClick={() => setDraft((current) => ({ ...current, hero_media_url: null, hero_media_type: 'image' }))}>Remove background media</button>}
      </div>
      <label className="admin-toggle"><input type="checkbox" checked={draft.hero_scanlines_enabled} onChange={(event) => setDraft((current) => ({ ...current, hero_scanlines_enabled: event.target.checked }))} /><span className="admin-toggle-track" /><span><strong>CRT scanlines</strong><small>Keep the existing analog texture over the background.</small></span></label>
      <div className="admin-form-footer"><p className="admin-feedback" role="status">{message}</p><SaveButton saving={saving} loading={loading} /></div>
    </form>
  </div>
}

function AboutSettingsPanel({ settings, loading, onSave }: SettingsPanelProps) {
  const [draft, setDraft] = useSettingsDraft(settings)
  const [locale, setLocale] = useState<Locale>('en')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const fieldId = useId()
  const localized = draft.about_copy[locale] ?? { eyebrow: '', title: '', body: '' }

  function updateCopy(field: keyof AboutCopy, value: string) {
    setDraft((current) => ({ ...current, about_copy: { ...current.about_copy, [locale]: { ...(current.about_copy[locale] ?? { eyebrow: '', title: '', body: '' }), [field]: value } } }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      await onSave(draft)
      setMessage('About copy saved.')
    } catch {
      setMessage('Could not save the about copy.')
    } finally {
      setSaving(false)
    }
  }

  return <div className="admin-panel-stack"><SettingsHeading eyebrow="03 / ABOUT" title="Say it your way." description="Edit the about section independently in English, Spanish, and Portuguese." />
    <form className="admin-card admin-form" onSubmit={handleSubmit}><LanguageTabs locale={locale} onChange={setLocale} />
      <div className="admin-field"><label htmlFor={`${fieldId}-eyebrow`}>Eyebrow</label><input id={`${fieldId}-eyebrow`} className="admin-input" value={localized.eyebrow} onChange={(event) => updateCopy('eyebrow', event.target.value)} /></div>
      <div className="admin-field"><label htmlFor={`${fieldId}-title`}>Headline <span className="admin-hint">Use a new line to split the headline.</span></label><textarea id={`${fieldId}-title`} className="admin-input" rows={2} value={localized.title} onChange={(event) => updateCopy('title', event.target.value)} /></div>
      <div className="admin-field"><label htmlFor={`${fieldId}-body`}>Description</label><textarea id={`${fieldId}-body`} className="admin-input" rows={5} value={localized.body} onChange={(event) => updateCopy('body', event.target.value)} /></div>
      <div className="admin-form-footer"><p className="admin-feedback" role="status">{message}</p><SaveButton saving={saving} loading={loading} /></div>
    </form>
  </div>
}

function ContactSettingsPanel({ settings, loading, onSave }: SettingsPanelProps) {
  const [draft, setDraft] = useSettingsDraft(settings)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const fieldId = useId()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setMessage('')
    try {
      await onSave(draft)
      setMessage('Contact settings saved.')
    } catch {
      setMessage('Could not save contact settings.')
    } finally {
      setSaving(false)
    }
  }

  return <div className="admin-panel-stack"><SettingsHeading eyebrow="04 / CONTACT" title="Open a channel." description="Choose which contact methods appear publicly, and update their destinations." />
    <form className="admin-card admin-form" onSubmit={handleSubmit}>
      <div className="admin-contact-field"><label className="admin-toggle"><input type="checkbox" checked={draft.show_contact_email} onChange={(event) => setDraft((current) => ({ ...current, show_contact_email: event.target.checked }))} /><span className="admin-toggle-track" /><span><strong>Email</strong><small>Show this address on the contact section.</small></span></label><div className="admin-field"><label htmlFor={`${fieldId}-email`}>Email address</label><input id={`${fieldId}-email`} className="admin-input" type="email" autoComplete="email" value={draft.contact_email ?? ''} onChange={(event) => setDraft((current) => ({ ...current, contact_email: event.target.value }))} /></div></div>
      <div className="admin-contact-field"><label className="admin-toggle"><input type="checkbox" checked={draft.show_contact_instagram} onChange={(event) => setDraft((current) => ({ ...current, show_contact_instagram: event.target.checked }))} /><span className="admin-toggle-track" /><span><strong>Instagram</strong><small>Show a public Instagram link.</small></span></label><div className="admin-field"><label htmlFor={`${fieldId}-instagram`}>Profile URL or handle</label><input id={`${fieldId}-instagram`} className="admin-input" type="text" autoComplete="url" placeholder="@deltranfunker" value={draft.contact_instagram ?? ''} onChange={(event) => setDraft((current) => ({ ...current, contact_instagram: event.target.value }))} /></div></div>
      <div className="admin-contact-field"><label className="admin-toggle"><input type="checkbox" checked={draft.show_contact_phone} onChange={(event) => setDraft((current) => ({ ...current, show_contact_phone: event.target.checked }))} /><span className="admin-toggle-track" /><span><strong>Phone</strong><small>Show a tap-to-call number.</small></span></label><div className="admin-field"><label htmlFor={`${fieldId}-phone`}>Phone number</label><input id={`${fieldId}-phone`} className="admin-input" type="tel" autoComplete="tel" value={draft.contact_phone ?? ''} onChange={(event) => setDraft((current) => ({ ...current, contact_phone: event.target.value }))} /></div></div>
      <div className="admin-form-footer"><p className="admin-feedback" role="status">{message}</p><SaveButton saving={saving} loading={loading} /></div>
    </form>
  </div>
}
