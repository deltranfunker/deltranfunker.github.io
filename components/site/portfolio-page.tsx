'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Globe2, Mail, Phone } from 'lucide-react'
import useSWR from 'swr'
import { getPublicSiteContent } from '@/lib/site-content-api'
import EventDetailPage from '@/components/site/event-detail-page'
import {
  DEFAULT_PUBLIC_CONTENT,
  type Locale,
  localizedValue,
} from '@/lib/site-content'

const copy = {
  en: {
    navWork: 'Work', navAbout: 'About', navContact: 'Contact', available: 'AVAILABLE FOR SELECT SHOWS', scroll: 'SCROLL TO EXPLORE',
    lineOne: 'LIVE', lineTwo: 'VISUAL', lineThree: 'WORLDS', stageLabel: 'DELTRAN FUNKER / MONTEVIDEO', stageTitle: 'REALTIME|VISUAL WORLDS', intro: 'Real-time visuals for the\nspace between sound and light.',
    ticker: 'VJ', ticker2: 'VISUALIST', ticker3: 'VISUAL ART', ticker4: 'VIDEOMAPPING',
    workEyebrow: 'EVENTS', viewEvent: 'View event gallery', contactEyebrow: 'GOT A FREQUENCY?',
    contactTitle: 'LET’S MAKE\nSOMETHING MOVE.', location: '34° S / 56° W · MONTEVIDEO · URUGUAY 🇺🇾', footer: 'MONTEVIDEO · URUGUAY 🇺🇾', back: 'BACK TO TOP',
  },
  es: {
    navWork: 'Obra', navAbout: 'Sobre mí', navContact: 'Contacto', available: 'DISPONIBLE PARA FECHAS', scroll: 'DESLIZÁ PARA EXPLORAR',
    lineOne: 'MUNDOS', lineTwo: 'VISUALES', lineThree: 'EN VIVO', stageLabel: 'DELTRAN FUNKER / MONTEVIDEO', stageTitle: 'VISUALES|EN TIEMPO REAL', intro: 'Visuales en tiempo real para\nel espacio entre sonido y luz.',
    ticker: 'VJ', ticker2: 'VISUALISTA', ticker3: 'ARTE VISUAL', ticker4: 'VIDEOMAPPING',
    workEyebrow: 'EVENTOS', viewEvent: 'Ver galería del evento', contactEyebrow: '¿SINTONIZAMOS?',
    contactTitle: 'HAGAMOS\nQUE SE MUEVA.', location: '34° S / 56° W · MONTEVIDEO · URUGUAY 🇺🇾', footer: 'MONTEVIDEO · URUGUAY 🇺🇾', back: 'VOLVER ARRIBA',
  },
  pt: {
    navWork: 'Trabalhos', navAbout: 'Sobre', navContact: 'Contato', available: 'DISPONÍVEL PARA EVENTOS', scroll: 'ROLE PARA EXPLORAR',
    lineOne: 'MUNDOS', lineTwo: 'VISUAIS', lineThree: 'AO VIVO', stageLabel: 'DELTRAN FUNKER / MONTEVIDÉU', stageTitle: 'VISUAIS|EM TEMPO REAL', intro: 'Visuais em tempo real para\no espaço entre som e luz.',
    ticker: 'VJ', ticker2: 'ARTISTA VISUAL', ticker3: 'ARTE VISUAL', ticker4: 'VIDEOMAPPING',
    workEyebrow: 'EVENTOS', viewEvent: 'Ver galeria do evento', contactEyebrow: 'QUAL É A FREQUÊNCIA?', contactTitle: 'VAMOS FAZER\nALGO SE MOVER.', location: '34° S / 56° W · MONTEVIDÉU · URUGUAI 🇺🇾', footer: 'MONTEVIDEO · URUGUAY 🇺🇾', back: 'VOLTAR AO TOPO',
  },
} satisfies Record<Locale, Record<string, string>>

function getLanguage(): Locale {
  if (typeof navigator === 'undefined') return 'en'
  const preferred = navigator.languages?.[0] || navigator.language || 'en'
  if (preferred.toLowerCase().startsWith('es')) return 'es'
  if (preferred.toLowerCase().startsWith('pt')) return 'pt'
  return 'en'
}

function InstagramIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
}

function instagramContact(value: string | null) {
  if (!value?.trim()) return null
  const raw = value.trim()
  let handle = raw.replace(/^@/, '')

  if (/^https?:\/\//i.test(raw)) {
    try {
      const url = new URL(raw)
      if (!/(^|\.)instagram\.com$/i.test(url.hostname)) return null
      handle = url.pathname.split('/').filter(Boolean)[0] ?? ''
    } catch {
      return null
    }
  }

  handle = handle.replace(/[^a-zA-Z0-9._]/g, '')
  return handle ? { handle, href: `https://www.instagram.com/${encodeURIComponent(handle)}/` } : null
}

function validEmail(value: string | null) {
  if (!value?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return null
  return value.trim()
}

function safePhone(value: string | null) {
  if (!value?.trim()) return null
  const dial = value.replace(/[^\d+]/g, '')
  return /^\+?\d{5,}$/.test(dial) ? { dial, label: value.trim() } : null
}

export default function PortfolioPage() {
  const [language, setLanguage] = useState<Locale>('en')
  const [isScrolled, setIsScrolled] = useState(false)
  const [selectedEventReference, setSelectedEventReference] = useState<{ id?: string; displayNumber?: string } | null>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const { data: content = DEFAULT_PUBLIC_CONTENT } = useSWR('public-site-content', getPublicSiteContent, {
    fallbackData: DEFAULT_PUBLIC_CONTENT,
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  })

  useEffect(() => {
    const detectedLanguage = getLanguage()
    setLanguage(detectedLanguage)
    document.documentElement.lang = detectedLanguage
  }, [])

  useEffect(() => {
    const updateScrollState = () => {
      const scrollY = window.scrollY
      logoRef.current?.style.setProperty('--scroll-offset', `${scrollY}px`)
      setIsScrolled(scrollY > 80)
    }
    updateScrollState()
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  const t = copy[language]
  const settings = content.settings
  const about = settings.about_copy[language] ?? settings.about_copy.en ?? DEFAULT_PUBLIC_CONTENT.settings.about_copy.en!
  const events = content.events
  const countLabel = String(events.length).padStart(3, '0')
  const email = settings.show_contact_email ? validEmail(settings.contact_email) : null
  const instagram = settings.show_contact_instagram ? instagramContact(settings.contact_instagram) : null
  const phone = settings.show_contact_phone ? safePhone(settings.contact_phone) : null

  return (
    <main className="site-shell" id="top">
      <header className="topbar">
        <span className="topbar-note">Deltran Funker</span>
        <label className="language-control"><Globe2 aria-hidden="true" /><span className="sr-only">Choose language</span><select value={language} onChange={(event) => { const nextLanguage = event.target.value as Locale; setLanguage(nextLanguage); document.documentElement.lang = nextLanguage }} aria-label="Choose language"><option value="es">🇺🇾 ES</option><option value="en">🇺🇸 EN</option><option value="pt">🇧🇷 PT</option></select></label>
      </header>
      <a ref={logoRef} className={`brand-logo${isScrolled ? ' is-docked' : ''}`} href="#top" aria-label="Deltran Funker home"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DeltranFunker_v3_1920-TzEiHE8AmHeiSHA4lubceXAoxM9St7.png" alt="Deltran Funker official yellow and cyan key emblem" /></a>

      <section className="hero hero-logo-stage" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden="true">
          {settings.hero_media_url && (settings.hero_media_type === 'video'
            ? <video className="hero-background-media" src={settings.hero_media_url} autoPlay muted loop playsInline preload="metadata" />
            : <img className="hero-background-media" src={settings.hero_media_url} alt="" />)}
          <div className="hero-background-shade" />
          <div className="media-glow media-glow-a" /><div className="media-glow media-glow-b" /><div className="media-grid" />
          {settings.hero_scanlines_enabled && <div className="media-scanlines" />}
          <div className="media-noise" />
        </div>
        <div className="hero-kicker"><span className="live-dot" /> {t.available}<span className="hero-index">34° S / 56° W</span></div>
        <div className="hero-bottom hero-stage-copy"><div><h1 id="hero-title">{t.stageTitle.split('|').map((line, index) => <span key={`${line}-${index}`}>{index ? <em>{line}</em> : line}<br /></span>)}</h1></div><a className="scroll-link" href="#work">{t.scroll}<ArrowDownRight aria-hidden="true" /></a></div>
        <div className="hero-side-note">SOUND IN / WORLDS OUT</div>
      </section>

      <section className="ticker" aria-label="Creative disciplines"><div className="ticker-track">{[0, 1].map((copyIndex) => <span className="ticker-copy" key={copyIndex}>{[t.ticker, t.ticker2, t.ticker3, t.ticker4].map((item) => <span key={`${copyIndex}-${item}`}>{item}<b>✳</b></span>)}</span>)}</div></section>

      <section className="work-section" id="work">
        <div className="section-heading"><p className="eyebrow">{t.workEyebrow} / 001—{countLabel}</p><p className="section-count">( {String(events.length).padStart(2, '0')} )</p></div>
        <div className="project-grid">{events.map((project) => {
          const title = localizedValue(project.title, language)
          const description = localizedValue(project.description, language)
          return <button className="project" type="button" key={project.id ?? project.display_number} onClick={() => setSelectedEventReference({ id: project.id, displayNumber: project.display_number })} aria-label={`${t.viewEvent}: ${title}`}>
            <div className={`project-art ${project.visual_style || 'visual-one'}`}>
              {project.media_url && (project.media_type === 'video'
                ? <video className="project-media" src={project.media_url} muted loop autoPlay playsInline preload="metadata" aria-label={`${title} project video`} />
                : <img className="project-media" src={project.media_url} alt={`${title} project visual`} loading="lazy" decoding="async" />)}
            </div>
            <div className="project-meta"><h3>{title}</h3><span>{description}</span></div>
          </button>
        })}</div>
      </section>

      <section className="about-section" id="about"><div className="about-copy"><p className="eyebrow">{about.eyebrow}</p><h2>{about.title.split('\n').map((line, index) => <span key={`${line}-${index}`}>{index === 1 ? <em>{line}</em> : line}<br /></span>)}</h2><p className="about-description">{about.body}</p></div></section>

      <section className="contact-section" id="contact"><span className="eyebrow">{t.contactEyebrow}</span><h2>{t.contactTitle.split('\n').map((line, index) => <span key={`${line}-${index}`}>{index === 1 ? <em>{line}</em> : line}<br /></span>)}</h2>
        {email && <a className="contact-link" href={`mailto:${email}`}><Mail aria-hidden="true" />{email}<ArrowUpRight aria-hidden="true" /></a>}
        {instagram && <a className="contact-link" href={instagram.href} target="_blank" rel="noreferrer"><InstagramIcon />@{instagram.handle}<ArrowUpRight aria-hidden="true" /></a>}
        {phone && <a className="contact-link" href={`tel:${phone.dial}`}><Phone aria-hidden="true" />{phone.label}<ArrowUpRight aria-hidden="true" /></a>}
      </section>
      <footer><span>{t.footer}</span><a href="#top">{t.back} ↑</a></footer>
      <EventDetailPage eventReference={selectedEventReference} language={language} onClose={() => setSelectedEventReference(null)} />
    </main>
  )
}
