'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export default function OAuthCallback() {
  const [callbackParams, setCallbackParams] = useState<{ code: string | null; error: string | null }>({ code: null, error: null })
  const { code, error: providerError } = callbackParams

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setCallbackParams({ code: params.get('code'), error: params.get('error_description') || params.get('error') })
  }, [])
  const { data, error } = useSWR(code ? ['github-oauth-callback', code] : null, async ([, authCode]: [string, string]) => {
    const client = getSupabaseBrowserClient()
    if (!client) throw new Error('Supabase is not configured.')
    const { error: exchangeError } = await client.auth.exchangeCodeForSession(authCode)
    if (exchangeError) throw new Error('GitHub sign-in could not be completed.')
    return true
  }, { revalidateOnFocus: false, shouldRetryOnError: false })

  useEffect(() => {
    if (data) {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
      window.location.replace(`${basePath}/admin/`)
    }
  }, [data])

  const failed = Boolean(error || providerError || (!code && !data))

  return <main className="admin-page"><div className="admin-state"><span className="admin-kicker">DELTRAN FUNKER / ADMIN</span><h1>{failed ? 'Sign-in did not complete.' : 'Verifying GitHub…'}</h1><p>{failed ? 'Return to the admin page and try again. If the issue continues, confirm the Supabase GitHub provider and redirect URL settings.' : 'Your session is being verified securely.'}</p><a className="admin-button admin-button-secondary" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/admin/`}>Back to admin</a></div></main>
}
