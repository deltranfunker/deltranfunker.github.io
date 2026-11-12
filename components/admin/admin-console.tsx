'use client'

import { useState } from 'react'
import { LogIn, LogOut, ShieldCheck } from 'lucide-react'
import useSWR from 'swr'
import { AdminPanels, type AdminSection } from '@/components/admin/admin-panels'
import { getAdminAccess, signInWithGitHub, signOutAdmin } from '@/lib/site-content-api'

const sections: { id: AdminSection; index: string; label: string; description: string }[] = [
  { id: 'hero', index: '01', label: 'Hero background', description: 'Background media and scanline treatment' },
  { id: 'events', index: '02', label: 'Events', description: 'Portfolio cards and localized copy' },
  { id: 'about', index: '03', label: 'About', description: 'About copy in three languages' },
  { id: 'contact', index: '04', label: 'Contact', description: 'Public contact methods' },
]

export default function AdminConsole() {
  const { data: access, error: accessError, isLoading, mutate } = useSWR('deltran-admin-access', getAdminAccess, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: false,
  })
  const [activeSection, setActiveSection] = useState<AdminSection>('hero')
  const [busy, setBusy] = useState(false)
  const [authMessage, setAuthMessage] = useState('')

  async function handleSignIn() {
    setBusy(true)
    setAuthMessage('')
    try {
      await signInWithGitHub()
    } catch {
      setAuthMessage('GitHub sign-in could not start. Check that the GitHub provider is enabled for this Supabase project.')
      setBusy(false)
    }
  }

  async function handleSignOut() {
    setBusy(true)
    await signOutAdmin()
    await mutate({ status: 'signed-out' }, false)
    setBusy(false)
  }

  if (isLoading) {
    return <main className="admin-page"><div className="admin-state"><span className="admin-kicker">DELTRAN FUNKER / ADMIN</span><p>Checking GitHub access…</p></div></main>
  }

  if (accessError) {
    return <main className="admin-page"><div className="admin-state"><span className="admin-kicker">DELTRAN FUNKER / ADMIN</span><h1>Access check unavailable</h1><p>Could not confirm the GitHub account allowlist. Refresh the page or check the connected Supabase configuration.</p></div></main>
  }

  if (access?.status === 'setup-needed') {
    return <main className="admin-page"><div className="admin-state"><span className="admin-kicker">DELTRAN FUNKER / ADMIN</span><h1>Admin backend not configured</h1><p>This build needs the connected Supabase URL and publishable key to be available at build time.</p></div></main>
  }

  if (access?.status === 'forbidden') {
    return <main className="admin-page"><div className="admin-state"><ShieldCheck aria-hidden="true" className="admin-state-icon" /><span className="admin-kicker">ACCESS RESTRICTED</span><h1>Not on the list.</h1><p>Only the GitHub account <strong>@deltranfunker</strong> can manage this site.</p><button className="admin-button admin-button-secondary" type="button" onClick={() => void handleSignIn()} disabled={busy}><LogIn aria-hidden="true" /> Sign in with the approved account</button></div></main>
  }

  if (access?.status !== 'admin') {
    return <main className="admin-page"><div className="admin-state"><span className="admin-kicker">DELTRAN FUNKER / ADMIN</span><h1>Make the site yours.</h1><p>Sign in with the approved GitHub account to manage backgrounds, events, copy, and contact links.</p><button className="admin-button admin-button-primary" type="button" onClick={() => void handleSignIn()} disabled={busy}><LogIn aria-hidden="true" /> {busy ? 'Opening GitHub…' : 'Continue with GitHub'}</button>{authMessage && <p className="admin-feedback" role="alert">{authMessage}</p>}<p className="admin-auth-note">This console is restricted to <strong>@deltranfunker</strong>.</p></div></main>
  }

  return (
    <main className="admin-page">
      <header className="admin-topbar"><a className="admin-wordmark" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/`}>DELTRAN FUNKER <span>/ ADMIN</span></a><div className="admin-topbar-actions"><span className="admin-account"><span className="admin-status-dot" /> {access.account}</span><button className="admin-logout" type="button" onClick={() => void handleSignOut()} disabled={busy}><LogOut aria-hidden="true" /> Sign out</button></div></header>
      <div className="admin-layout">
        <aside className="admin-sidebar"><div className="admin-sidebar-intro"><span className="admin-kicker">CONTROL ROOM</span><h1>Site settings</h1><p>Everything public, in one place.</p></div><nav className="admin-nav" aria-label="Admin sections">{sections.map((section) => <button key={section.id} type="button" className={activeSection === section.id ? 'is-active' : ''} aria-current={activeSection === section.id ? 'page' : undefined} onClick={() => setActiveSection(section.id)}><span className="admin-nav-index">{section.index}</span><span><strong>{section.label}</strong><small>{section.description}</small></span></button>)}</nav><p className="admin-sidebar-note"><ShieldCheck aria-hidden="true" /> Writes are checked again by Supabase row-level security.</p></aside>
        <section className="admin-workspace" aria-live="polite"><AdminPanels section={activeSection} /></section>
      </div>
    </main>
  )
}
