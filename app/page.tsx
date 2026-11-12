'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Globe2, Mail } from 'lucide-react'

type Language = 'en' | 'es' | 'pt'

function InstagramIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
}

const copy = {
  en: {
    navWork: 'Work', navAbout: 'About', navContact: 'Contact', available: 'AVAILABLE FOR SELECT SHOWS', scroll: 'SCROLL TO EXPLORE',
    lineOne: 'LIVE', lineTwo: 'VISUAL', lineThree: 'WORLDS', stageLabel: 'DELTRAN FUNKER / MONTEVIDEO', stageTitle: 'REALTIME|VISUAL WORLDS', intro: 'Real-time visuals for the\nspace between sound and light.',
    ticker: 'VJ', ticker2: 'VISUALIST', ticker3: 'VISUAL ART', ticker4: 'VIDEOMAPPING',
    workEyebrow: 'EVENTS', aboutEyebrow: 'BUILT FOR THE ROOM', aboutTitle: 'A little strange.\nA lot of feeling.',
    aboutText: 'Deltran Funker is a video jockey and visual artist creating live audiovisual worlds. Mixing 2D and 3D art, shaders, motion graphics, and internet language, each performance bends digital matter around the energy of the room.',
    linkWork: 'FOLLOW THE SIGNAL', contactEyebrow: 'GOT A FREQUENCY?', contactTitle: 'LET’S MAKE\nSOMETHING MOVE.', location: '34° S / 56° W · MONTEVIDEO · URUGUAY 🇺🇾', footer: 'MONTEVIDEO · URUGUAY 🇺🇾', back: 'BACK TO TOP',
  },
  es: {
    navWork: 'Obra', navAbout: 'Sobre mí', navContact: 'Contacto', available: 'DISPONIBLE PARA FECHAS', scroll: 'DESLIZÁ PARA EXPLORAR',
    lineOne: 'MUNDOS', lineTwo: 'VISUALES', lineThree: 'EN VIVO', stageLabel: 'DELTRAN FUNKER / MONTEVIDEO', stageTitle: 'VISUALES|EN TIEMPO REAL', intro: 'Visuales en tiempo real para\nel espacio entre sonido y luz.',
    ticker: 'VJ', ticker2: 'VISUALISTA', ticker3: 'ARTE VISUAL', ticker4: 'VIDEOMAPPING',
    workEyebrow: 'EVENTOS', aboutEyebrow: 'HECHO PARA EL ESPACIO', aboutTitle: 'Un poco extraño.\nMucho sentimiento.',
    aboutText: 'Deltran Funker es VJ y artista visual, creando mundos audiovisuales en vivo. Combina arte 2D y 3D, shaders, motion graphics y lenguaje de internet para transformar cada espacio con la energía del momento.',
    linkWork: 'SEGUÍ LA SEÑAL', contactEyebrow: '¿SINTONIZAMOS?', contactTitle: 'HAGAMOS\nQUE SE MUEVA.', location: '34° S / 56° W · MONTEVIDEO · URUGUAY 🇺🇾', footer: 'MONTEVIDEO · URUGUAY 🇺🇾', back: 'VOLVER ARRIBA',
  },
  pt: {
    navWork: 'Trabalhos', navAbout: 'Sobre', navContact: 'Contato', available: 'DISPONÍVEL PARA EVENTOS', scroll: 'ROLE PARA EXPLORAR',
    lineOne: 'MUNDOS', lineTwo: 'VISUAIS', lineThree: 'AO VIVO', stageLabel: 'DELTRAN FUNKER / MONTEVIDÉU', stageTitle: 'VISUAIS|EM TEMPO REAL', intro: 'Visuais em tempo real para\no espaço entre som e luz.',
    ticker: 'VJ', ticker2: 'ARTISTA VISUAL', ticker3: 'ARTE VISUAL', ticker4: 'VIDEOMAPPING',
    workEyebrow: 'EVENTOS', aboutEyebrow: 'FEITO PARA O ESPAÇO', aboutTitle: 'Um pouco estranho.\nMuito sentimento.',
    aboutText: 'Deltran Funker é VJ e artista visual, criando mundos audiovisuais ao vivo. Combina arte 2D e 3D, shaders, motion graphics e linguagem de internet para transformar cada espaço com a energia do momento.',
    linkWork: 'SIGA O SINAL', contactEyebrow: 'QUAL É A FREQUÊNCIA?', contactTitle: 'VAMOS FAZER\nALGO SE MOVER.', location: '34° S / 56° W · MONTEVIDÉU · URUGUAI 🇺🇾', footer: 'MONTEVIDEO · URUGUAY 🇺🇾', back: 'VOLTAR AO TOPO',
  },
}

const projects = [
  { number: '01', title: 'FUNKER.exe', note: 'Live visual system', style: 'visual-one', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DeltranFunker3.23.png-QxaAIZuw9EfIrFGmK8edVpV93JNGgh.jpeg' },
  { number: '02', title: 'KEY TO THE VOID', note: '3D character / realtime', style: 'visual-two', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DeltranFunker3.23.png-QxaAIZuw9EfIrFGmK8edVpV93JNGgh.jpeg' },
  { number: '03', title: 'SOFT ERROR', note: 'Shader experiments', style: 'visual-three', image: '' },
]

function getLanguage(): Language {
  if (typeof navigator === 'undefined') return 'en'
  const preferred = navigator.languages?.[0] || navigator.language || 'en'
  if (preferred.toLowerCase().startsWith('es')) return 'es'
  if (preferred.toLowerCase().startsWith('pt')) return 'pt'
  return 'en'
}

export default function Page() {
  const [language, setLanguage] = useState<Language>('en')
  const [isScrolled, setIsScrolled] = useState(false)
  const logoRef = useRef<HTMLAnchorElement>(null)
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

  return (
    <main className="site-shell" id="top">
      <header className="topbar">
        <span className="topbar-note">Deltran Funker</span>
        <label className="language-control"><Globe2 aria-hidden="true" /><span className="sr-only">Choose language</span><select value={language} onChange={(event) => setLanguage(event.target.value as Language)} aria-label="Choose language"><option value="es">🇺🇾 ES</option><option value="en">🇺🇸 EN</option><option value="pt">🇧🇷 PT</option></select></label>
      </header>
      <a ref={logoRef} className={`brand-logo${isScrolled ? ' is-docked' : ''}`} href="#top" aria-label="Deltran Funker home"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DeltranFunker_v3_1920-TzEiHE8AmHeiSHA4lubceXAoxM9St7.png" alt="Deltran Funker official yellow and cyan key emblem" /></a>

      <section className="hero hero-logo-stage" aria-labelledby="hero-title">
        <div className="hero-media" aria-hidden="true"><div className="media-glow media-glow-a" /><div className="media-glow media-glow-b" /><div className="media-grid" /><div className="media-scanlines" /><div className="media-noise" /></div>
        <div className="hero-kicker"><span className="live-dot" /> {t.available}<span className="hero-index">34° S / 56° W</span></div>
        <div className="hero-bottom hero-stage-copy"><div><h1 id="hero-title">{t.stageTitle.split('|').map((line, index) => <span key={line}>{index ? <em>{line}</em> : line}<br /></span>)}</h1></div><a className="scroll-link" href="#work">{t.scroll}<ArrowDownRight aria-hidden="true" /></a></div>
        <div className="hero-side-note">SOUND IN / WORLDS OUT</div>
      </section>

      <section className="ticker" aria-label="Creative disciplines"><div className="ticker-track">{[0, 1].map((copyIndex) => <span className="ticker-copy" key={copyIndex}>{[t.ticker, t.ticker2, t.ticker3, t.ticker4].map((item) => <span key={`${copyIndex}-${item}`}>{item}<b>✳</b></span>)}</span>)}</div></section>

      <section className="work-section" id="work">
        <div className="section-heading"><p className="eyebrow">{t.workEyebrow} / 001—003</p><p className="section-count">( 03 )</p></div>
        <div className="project-grid">{projects.map((project) => <a className="project" href="https://www.instagram.com/deltranfunker/" target="_blank" rel="noreferrer" key={project.number}>
          <div className={`project-art ${project.style}`}>{project.image && <img src={project.image} alt={project.number === '01' ? 'Glowing 3D Deltran Funker key over a magenta cosmic nebula' : 'Yellow and cyan low-poly 3D key emblem on black'} />}<span className="project-number">{project.number}</span><span className="project-arrow"><ArrowUpRight /></span><span className="project-art-label">DF—{project.number}</span></div>
          <div className="project-meta"><h3>{project.title}</h3><span>{project.note}</span></div>
        </a>)}</div>
      </section>

      <section className="about-section" id="about"><div className="about-copy"><p className="eyebrow">{t.aboutEyebrow}</p><h2>{t.aboutTitle.split('\n').map((line, index) => <span key={line}>{index === 1 ? <em>{line}</em> : line}<br /></span>)}</h2><p className="about-description">{t.aboutText}</p></div></section>

      <section className="contact-section" id="contact"><span className="eyebrow">{t.contactEyebrow}</span><h2>{t.contactTitle.split('\n').map((line, index) => <span key={line}>{index === 1 ? <em>{line}</em> : line}<br /></span>)}</h2><a className="contact-link" href="mailto:deltranfunker@gmail.com"><Mail aria-hidden="true" />deltranfunker@gmail.com <ArrowUpRight aria-hidden="true" /></a><a className="contact-link" href="https://www.instagram.com/deltranfunker/" target="_blank" rel="noreferrer"><InstagramIcon />@deltranfunker <ArrowUpRight aria-hidden="true" /></a></section>
      <footer><span>MONTEVIDEO · URUGUAY 🇺🇾</span><a href="#top">{t.back} ↑</a></footer>
    </main>
  )
}
