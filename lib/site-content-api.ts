import {
  DEFAULT_EVENTS,
  DEFAULT_SITE_SETTINGS,
  DEFAULT_PUBLIC_CONTENT,
  type PortfolioEvent,
  type PublicSiteContent,
  type SiteSettings,
} from '@/lib/site-content'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export type AdminAccess =
  | { status: 'setup-needed' }
  | { status: 'signed-out' }
  | { status: 'forbidden' }
  | { status: 'admin'; account: string }

const SETTINGS_COLUMNS = 'id,hero_media_url,hero_media_type,hero_scanlines_enabled,about_copy,contact_email,contact_instagram,contact_phone,show_contact_email,show_contact_instagram,show_contact_phone,updated_at'
const EVENT_COLUMNS = 'id,display_number,sort_order,title,description,media_url,media_type,visual_style,link_url,is_active,created_at,updated_at'

export async function getPublicSiteContent(): Promise<PublicSiteContent> {
  const client = getSupabaseBrowserClient()
  if (!client) return DEFAULT_PUBLIC_CONTENT

  const [settingsResult, eventsResult] = await Promise.all([
    client.from('site_settings_public').select(SETTINGS_COLUMNS).eq('id', 'primary').maybeSingle(),
    client.from('events').select(EVENT_COLUMNS).eq('is_active', true).order('sort_order', { ascending: true }),
  ])

  if (settingsResult.error || eventsResult.error) {
    throw new Error('Public site content could not be loaded.')
  }

  return {
    settings: (settingsResult.data as SiteSettings | null) ?? DEFAULT_SITE_SETTINGS,
    events: (eventsResult.data as PortfolioEvent[] | null) ?? DEFAULT_EVENTS,
  }
}

export async function getAdminAccess(): Promise<AdminAccess> {
  const client = getSupabaseBrowserClient()
  if (!client) return { status: 'setup-needed' }

  const { data: sessionData, error: sessionError } = await client.auth.getSession()
  if (sessionError) throw new Error('Could not check the admin session.')
  if (!sessionData.session) return { status: 'signed-out' }

  const { data: userData, error: userError } = await client.auth.getUser()
  if (userError || !userData.user) {
    await client.auth.signOut()
    return { status: 'signed-out' }
  }

  const { data: isAdmin, error: authorizationError } = await client.rpc('is_site_admin')
  if (authorizationError) throw new Error('Could not verify the GitHub account allowlist.')
  if (isAdmin !== true) {
    await client.auth.signOut()
    return { status: 'forbidden' }
  }

  return { status: 'admin', account: userData.user.email ?? '@deltranfunker' }
}

export async function signInWithGitHub() {
  const client = getSupabaseBrowserClient()
  if (!client) throw new Error('Supabase is not configured for this build.')

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  const redirectTo = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL
    || `${window.location.origin}${basePath}/auth/callback/`
  const { error } = await client.auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo, scopes: 'read:user user:email' },
  })

  if (error) throw new Error('GitHub sign-in is unavailable. Confirm that the GitHub provider is enabled.')
}

export async function signOutAdmin() {
  const client = getSupabaseBrowserClient()
  if (!client) return
  const { error } = await client.auth.signOut()
  if (error) throw new Error('Could not sign out.')
}

export async function fetchAdminSettings(): Promise<SiteSettings> {
  const client = getSupabaseBrowserClient()
  if (!client) throw new Error('Supabase is not configured.')

  const { data, error } = await client.from('site_settings').select(SETTINGS_COLUMNS).eq('id', 'primary').maybeSingle()
  if (error) throw new Error('Could not load site settings.')
  return (data as SiteSettings | null) ?? DEFAULT_SITE_SETTINGS
}

export async function fetchAdminEvents(): Promise<PortfolioEvent[]> {
  const client = getSupabaseBrowserClient()
  if (!client) throw new Error('Supabase is not configured.')

  const { data, error } = await client.from('events').select(EVENT_COLUMNS).order('sort_order', { ascending: true })
  if (error) throw new Error('Could not load events.')
  return (data as PortfolioEvent[] | null) ?? []
}

export async function saveSiteSettings(settings: SiteSettings): Promise<SiteSettings> {
  const client = getSupabaseBrowserClient()
  if (!client) throw new Error('Supabase is not configured.')

  const { data, error } = await client.from('site_settings')
    .update({ ...settings, updated_at: new Date().toISOString() })
    .eq('id', 'primary')
    .select(SETTINGS_COLUMNS)
    .single()
  if (error || !data) throw new Error('Could not save site settings.')
  return data as SiteSettings
}

export async function savePortfolioEvent(event: PortfolioEvent): Promise<PortfolioEvent> {
  const client = getSupabaseBrowserClient()
  if (!client) throw new Error('Supabase is not configured.')

  const payload = {
    display_number: event.display_number.trim(),
    sort_order: Number(event.sort_order),
    title: event.title,
    description: event.description,
    media_url: event.media_url,
    media_type: event.media_type,
    visual_style: event.visual_style,
    link_url: event.link_url,
    is_active: event.is_active,
    updated_at: new Date().toISOString(),
  }

  const result = event.id
    ? await client.from('events').update(payload).eq('id', event.id).select(EVENT_COLUMNS).single()
    : await client.from('events').insert(payload).select(EVENT_COLUMNS).single()

  if (result.error || !result.data) throw new Error('Could not save this event. Check that its number is unique.')
  return result.data as PortfolioEvent
}

export async function deletePortfolioEvent(id: string) {
  const client = getSupabaseBrowserClient()
  if (!client) throw new Error('Supabase is not configured.')

  const { error } = await client.from('events').delete().eq('id', id)
  if (error) throw new Error('Could not delete this event.')
}

export async function uploadContentMedia(file: File, area: 'hero' | 'events') {
  const client = getSupabaseBrowserClient()
  if (!client) throw new Error('Supabase is not configured.')
  if (file.size > 50 * 1024 * 1024) throw new Error('Choose a file smaller than 50 MB.')

  const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'video/mp4', 'video/webm'])
  if (!allowedTypes.has(file.type)) throw new Error('Use a JPG, PNG, WebP, GIF, AVIF, MP4, or WebM file.')

  const extension = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'media'
  const path = `${area}/${crypto.randomUUID()}.${extension}`
  const { data, error } = await client.storage.from('site-media').upload(path, file, {
    cacheControl: '31536000',
    contentType: file.type,
    upsert: false,
  })
  if (error || !data) throw new Error('Media upload failed. Confirm that your GitHub account is authorized.')

  const { data: publicUrlData } = client.storage.from('site-media').getPublicUrl(data.path)
  return {
    url: publicUrlData.publicUrl,
    type: file.type.startsWith('video/') ? 'video' as const : 'image' as const,
  }
}
