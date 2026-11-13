'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, X } from 'lucide-react'
import useSWR from 'swr'
import { fetchPublicEvent } from '@/lib/site-content-api'
import { localizedValue, type EventGalleryMedia, type Locale, type PortfolioEvent } from '@/lib/site-content'
import { normalizeEventEmbedUrl, safeGalleryMediaUrl } from '@/lib/event-media'

const MODAL_TRANSITION_MS = 180

const copy = {
  en: { close: 'Close event gallery', gallery: 'EVENT GALLERY', mediaItem: 'Show media item', loading: 'Loading event…', unavailable: 'This event is unavailable.', unavailableDescription: 'It may have been unpublished or removed.', noDescription: 'There is no description yet.' },
  es: { close: 'Cerrar galería del evento', gallery: 'GALERÍA DEL EVENTO', mediaItem: 'Mostrar contenido', loading: 'Cargando evento…', unavailable: 'Este evento no está disponible.', unavailableDescription: 'Es posible que se haya ocultado o eliminado.', noDescription: 'Todavía no hay una descripción disponible.' },
  pt: { close: 'Fechar galeria do evento', gallery: 'GALERIA DO EVENTO', mediaItem: 'Mostrar mídia', loading: 'Carregando evento…', unavailable: 'Este evento não está disponível.', unavailableDescription: 'Ele pode ter sido ocultado ou removido.', noDescription: 'Ainda não há uma descrição disponível.' },
} satisfies Record<Locale, Record<string, string>>

function GalleryVisual({ item, title }: { item: EventGalleryMedia; title: string }) {
  const mediaLabel = title

  if (item.type === 'embed') {
    const source = normalizeEventEmbedUrl(item.url)
    return source
      ? <div className="event-gallery-embed"><iframe src={source} title={mediaLabel} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" sandbox="allow-scripts allow-same-origin allow-presentation" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen /></div>
      : <div className="event-gallery-invalid">Embed unavailable</div>
  }

  const source = safeGalleryMediaUrl(item.url)
  if (!source) return <div className="event-gallery-invalid">Media unavailable</div>

  return item.type === 'video'
    ? <video src={source} controls playsInline preload="metadata" aria-label={mediaLabel} />
    : <img src={source} alt={mediaLabel} loading="lazy" decoding="async" />
}

function EventCover({ event, title }: { event: PortfolioEvent; title: string }) {
  const source = event.media_url ? safeGalleryMediaUrl(event.media_url) : null

  if (!source) return <div className={`event-detail-cover-art ${event.visual_style || 'visual-one'}`} aria-hidden="true" />
  return event.media_type === 'video'
    ? <video className="event-detail-cover-media" src={source} muted autoPlay loop playsInline preload="metadata" aria-label={`${title} event video`} />
    : <img className="event-detail-cover-media" src={source} alt={`${title} event artwork`} />
}

function EventDetailContent({ event, language }: { event: PortfolioEvent; language: Locale }) {
  const text = copy[language]
  const title = localizedValue(event.title, language)
  const summary = localizedValue(event.description, language)
  const detail = localizedValue(event.detail_description, language)
  const gallery = event.gallery_media ?? []
  const [activeMediaId, setActiveMediaId] = useState<string | null>(gallery[0]?.id ?? null)
  const activeMedia = gallery.find((item) => item.id === activeMediaId)
  const activeCaption = activeMedia ? localizedValue(activeMedia.caption, language) : ''

  return <div className="event-detail-layout">
    <section className="event-detail-media-pane" aria-label={text.gallery}>
      <div className="event-gallery-current">
        {activeMedia
          ? <div className="event-gallery-visual"><GalleryVisual item={activeMedia} title={activeCaption || title} /></div>
          : <div className="event-detail-cover"><EventCover event={event} title={title} /></div>}
        {activeCaption && <p className="event-gallery-active-caption">{activeCaption}</p>}
      </div>
      {gallery.length > 0 && <div className="event-gallery-thumbnails" role="group" aria-label={text.gallery}>
        {gallery.map((item, index) => {
          const caption = localizedValue(item.caption, language)
          const source = item.type === 'image' ? safeGalleryMediaUrl(item.url) : null
          return <button className={`event-gallery-thumb${activeMediaId === item.id ? ' is-active' : ''}`} type="button" key={item.id} onClick={() => setActiveMediaId(item.id)} aria-pressed={activeMediaId === item.id} aria-label={`${text.mediaItem} ${index + 1}: ${caption || title}`}>
            {source ? <img src={source} alt="" loading="lazy" decoding="async" /> : <span aria-hidden="true"><Play /></span>}
          </button>
        })}
      </div>}
    </section>
    <section className="event-detail-copy-pane" aria-label={`${title} description`}>
      {summary && <p className="event-detail-summary">{summary}</p>}
      {detail && detail !== summary && <div className="event-detail-story"><p>{detail}</p></div>}
      {!summary && !detail && <p className="event-detail-empty">{text.noDescription}</p>}
    </section>
  </div>
}

type EventReference = { id?: string; displayNumber?: string }

type EventDetailPageProps = {
  eventReference: EventReference | null
  language: Locale
  onClose: () => void
}

export default function EventDetailPage({ eventReference, language, onClose }: EventDetailPageProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeTimerRef = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const eventKey = eventReference ? ['public-event-detail', eventReference.id ?? eventReference.displayNumber ?? ''] : null
  const { data: event, error, isLoading } = useSWR<PortfolioEvent | null>(
    eventKey,
    () => fetchPublicEvent(eventReference ?? {}),
    { shouldRetryOnError: false },
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!eventReference || !dialog) return
    setIsVisible(false)
    if (!dialog.open) dialog.showModal()
    const animationFrame = window.requestAnimationFrame(() => setIsVisible(true))
    return () => {
      window.cancelAnimationFrame(animationFrame)
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
      if (dialog.open) dialog.close()
    }
  }, [eventReference])

  const closeModal = () => {
    if (closeTimerRef.current !== null) return
    setIsVisible(false)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    closeTimerRef.current = window.setTimeout(() => {
      dialogRef.current?.close()
      closeTimerRef.current = null
      onClose()
    }, prefersReducedMotion ? 0 : MODAL_TRANSITION_MS)
  }

  const text = copy[language]
  const title = event ? localizedValue(event.title, language) : error ? text.unavailable : text.loading
  if (!eventReference) return null

  return <dialog ref={dialogRef} className={`event-detail-page${isVisible ? ' is-visible' : ''}`} aria-modal="true" aria-labelledby="event-modal-title" onCancel={(dialogEvent) => { dialogEvent.preventDefault(); closeModal() }} onClick={(dialogEvent) => { if (dialogEvent.target === dialogEvent.currentTarget) closeModal() }}>
    <header className="event-detail-topbar">
      <h2 id="event-modal-title" className="event-modal-title">{title}</h2>
      <button className="event-modal-close" type="button" onClick={closeModal} aria-label={text.close}><X aria-hidden="true" /></button>
    </header>
    <div className="event-detail-content">
      {isLoading
        ? <div className="event-detail-state" role="status"><span className="event-detail-spinner" aria-hidden="true" /><span>{text.loading}</span></div>
        : error || !event
          ? <section className="event-detail-state" role="status"><h3>{text.unavailable}</h3><p>{text.unavailableDescription}</p></section>
          : <EventDetailContent key={event.id} event={event} language={language} />}
    </div>
  </dialog>
}
