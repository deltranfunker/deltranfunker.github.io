import { createBrowserClient } from '@supabase/ssr'

let browserClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseBrowserClient() {
  if (typeof window === 'undefined') return null

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return null

  if (!browserClient) {
    browserClient = createBrowserClient(url, key, {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: false,
      },
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
      },
    })
  }

  return browserClient
}
