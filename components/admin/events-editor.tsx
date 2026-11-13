'use client'

import { useEffect, useId, useState, type FormEvent, type ChangeEvent } from 'react'
import { Plus, Save, Trash2, Upload } from 'lucide-react'
import useSWR from 'swr'
import {
  deletePortfolioEvent,
  fetchAdminEvents,
  savePortfolioEvent,
  uploadContentMedia,
} from '@/lib/site-content-api'
import { DEFAULT_EVENTS, SITE_LANGUAGES, type Locale, type PortfolioEvent } from '@/lib/site-content'

function newEvent(events: PortfolioEvent[]): PortfolioEvent {
  const nextNumber = events.reduce((max, event) => Math.max(max, Number.parseInt(event.display_number, 10) || 0), 0) + 1
  const nextOrder = events.reduce((max, event) => Math.max(max, event.sort_order || 0), 0) + 1
  return {
    display_number: String(nextNumber).padStart(2, '0'),
    sort_order: nextOrder,
    title: { en: '', es: '', pt: '' },
    description: { en: '', es: '', pt: '' },
    detail_description: { en: '', es: '', pt: '' },
    gallery_media: [],
    media_url: null,
    media_type: 'none',
    visual_style: 'visual-one',
    link_url: 'https://www.instagram.com/deltranfunker/',
    is_active: true,
  }
}

export default function EventsEditor() {
  const { data: events = DEFAULT_EVENTS, error, isLoading, mutate } = useSWR('deltran-admin-events', fetchAdminEvents, {
    fallbackData: DEFAULT_EVENTS,
    shouldRetryOnError: false,
  })
  const [creating, setCreating] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSave(event: PortfolioEvent) {
    setMessage('')
    try {
      await savePortfolioEvent(event)
      await mutate()
      setCreating(false)
      setMessage('Event saved.')
    } catch (saveError) {
      setMessage(saveError instanceof Error ? saveError.message : 'Could not save this event.')
      throw saveError
    }
  }

  async function handleDelete(id: string) {
    setMessage('')
    try {
      await deletePortfolioEvent(id)
      await mutate()
      setMessage('Event removed.')
    } catch {
      setMessage('Could not remove this event.')
    }
  }

  return <div className="admin-panel-stack"><header className="admin-panel-heading"><span className="admin-kicker">02 / EVENTS</span><h2>Curate the lineup.</h2><p>Add or remove event cards, edit their text in all three languages, and upload new artwork.</p></header>
    {error && <div className="admin-card admin-error" role="alert">Could not load events. Confirm the signed-in account has admin access.</div>}
    <div className="admin-event-toolbar"><p className="admin-feedback" role="status">{message}</p><button className="admin-button admin-button-primary" type="button" onClick={() => { setCreating(true); setMessage('') }} disabled={creating || isLoading}><Plus aria-hidden="true" /> Add event</button></div>
    {creating && <EventForm event={newEvent(events)} loading={isLoading} onSave={handleSave} onCancel={() => setCreating(false)} />}
    {!isLoading && events.length === 0 && !creating && <div className="admin-card admin-empty-state">No events yet. Add one to start building the lineup.</div>}
    <div className="admin-event-list">{events.map((event) => <EventForm key={event.id ?? event.display_number} event={event} loading={isLoading} onSave={handleSave} onDelete={event.id ? () => handleDelete(event.id!) : undefined} />)}</div>
  </div>
}

function EventForm({ event, loading, onSave, onDelete, onCancel }: {
  event: PortfolioEvent
  loading: boolean
  onSave: (event: PortfolioEvent) => Promise<void>
  onDelete?: () => Promise<void>
  onCancel?: () => void
}) {
  const [draft, setDraft] = useState(event)
  const [locale, setLocale] = useState<Locale>('en')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const fileId = useId()
  const fieldId = useId()

  useEffect(() => setDraft(event), [event])

  function updateLocalized(field: 'title' | 'description', value: string) {
    setDraft((current) => ({ ...current, [field]: { ...current[field], [locale]: value } }))
  }

  async function handleSubmit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault()
    if (!draft.title.en?.trim()) {
      setMessage('Add an English title before saving.')
      return
    }
    setSaving(true)
    setMessage('')
    try {
      await onSave(draft)
      setMessage('Saved.')
    } catch {
      setMessage('Could not save this event.')
    } finally {
      setSaving(false)
    }
  }

  async function handleFile(formEvent: ChangeEvent<HTMLInputElement>) {
    const file = formEvent.currentTarget.files?.[0]
    formEvent.currentTarget.value = ''
    if (!file) return
    setUploading(true)
    setMessage('')
    try {
      const uploaded = await uploadContentMedia(file, 'events')
      setDraft((current) => ({ ...current, media_url: uploaded.url, media_type: uploaded.type }))
      setMessage('Upload complete. Save this event to publish the media.')
    } catch (uploadError) {
      setMessage(uploadError instanceof Error ? uploadError.message : 'Media upload failed.')
    } finally {
      setUploading(false)
    }
  }

  async function handleDelete() {
    if (!onDelete || !window.confirm('Remove this event? This cannot be undone.')) return
    setSaving(true)
    try {
      await onDelete()
    } finally {
      setSaving(false)
    }
  }

  const title = draft.title[locale] ?? ''
  const description = draft.description[locale] ?? ''

  return <form className="admin-card admin-event-card" onSubmit={handleSubmit}>
    <div className="admin-event-card-heading"><span className="admin-kicker">EVENT</span><label className="admin-toggle admin-toggle-compact"><input type="checkbox" checked={draft.is_active} onChange={(formEvent) => setDraft((current) => ({ ...current, is_active: formEvent.target.checked }))} /><span className="admin-toggle-track" /><span><strong>Visible</strong></span></label></div>
    <div className="admin-event-grid">
      <div className="admin-event-media"><div className={`admin-event-preview ${draft.visual_style}`}>{draft.media_url ? (draft.media_type === 'video' ? <video src={draft.media_url} controls muted playsInline /> : <img src={draft.media_url} alt="Event artwork preview" />) : <span>NO MEDIA</span>}</div>
        <label className="admin-file-picker" htmlFor={fileId}><input id={fileId} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4,video/webm" onChange={handleFile} disabled={uploading || loading || saving} /><span><Upload aria-hidden="true" /> {uploading ? 'Uploading…' : 'Replace artwork'}</span><small>Image or looping video · max 50 MB</small></label>
        {draft.media_url && <button className="admin-text-button" type="button" onClick={() => setDraft((current) => ({ ...current, media_url: null, media_type: 'none' }))}>Remove artwork</button>}
        <div className="admin-field"><label htmlFor={`${fieldId}-style`}>Artwork fallback</label><select id={`${fieldId}-style`} className="admin-input" value={draft.visual_style} onChange={(formEvent) => setDraft((current) => ({ ...current, visual_style: formEvent.target.value }))}><option value="visual-one">Nebula</option><option value="visual-two">Dark field</option><option value="visual-three">Signal pattern</option></select></div>
      </div>
      <div className="admin-event-fields"><div className="admin-field"><label htmlFor={`${fieldId}-order`}>Display order</label><input id={`${fieldId}-order`} className="admin-input" type="number" min="1" step="1" value={draft.sort_order} onChange={(formEvent) => setDraft((current) => ({ ...current, sort_order: Number(formEvent.target.value) }))} /></div>
        <LanguageTabs locale={locale} onChange={setLocale} />
        <div className="admin-field"><label htmlFor={`${fieldId}-title`}>Title · {SITE_LANGUAGES.find((item) => item.code === locale)?.label}</label><input id={`${fieldId}-title`} className="admin-input" value={title} onChange={(formEvent) => updateLocalized('title', formEvent.target.value)} /></div>
        <div className="admin-field"><label htmlFor={`${fieldId}-description`}>Description · {SITE_LANGUAGES.find((item) => item.code === locale)?.label}</label><textarea id={`${fieldId}-description`} className="admin-input" rows={3} value={description} onChange={(formEvent) => updateLocalized('description', formEvent.target.value)} /></div>
      </div>
    </div>
    <div className="admin-form-footer"><p className="admin-feedback" role="status">{message}</p><div className="admin-form-actions">{onCancel && <button className="admin-button admin-button-secondary" type="button" onClick={onCancel}>Cancel</button>}{onDelete && <button className="admin-button admin-button-danger" type="button" onClick={() => void handleDelete()} disabled={saving || loading}><Trash2 aria-hidden="true" /> Remove</button>}<button className="admin-button admin-button-primary" type="submit" disabled={saving || loading || uploading}><Save aria-hidden="true" /> {saving ? 'Saving…' : 'Save event'}</button></div></div>
  </form>
}

function LanguageTabs({ locale, onChange }: { locale: Locale; onChange: (locale: Locale) => void }) {
  return <div className="admin-language-tabs" role="group" aria-label="Choose event language">{SITE_LANGUAGES.map((language) => <button key={language.code} type="button" aria-pressed={locale === language.code} className={locale === language.code ? 'is-active' : ''} onClick={() => onChange(language.code)}>{language.label}</button>)}</div>
}
