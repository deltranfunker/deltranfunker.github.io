export const SITE_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
] as const

export type Locale = (typeof SITE_LANGUAGES)[number]['code']
export type LocalizedString = Partial<Record<Locale, string>>

export type EventGalleryMedia = {
  id: string
  type: 'image' | 'video' | 'embed'
  url: string
  caption: LocalizedString
}

export type AboutCopy = {
  eyebrow: string
  title: string
  body: string
}

export type SiteSettings = {
  id: string
  hero_media_url: string | null
  hero_media_type: 'image' | 'video'
  hero_scanlines_enabled: boolean
  about_copy: Partial<Record<Locale, AboutCopy>>
  contact_email: string | null
  contact_instagram: string | null
  contact_phone: string | null
  show_contact_email: boolean
  show_contact_instagram: boolean
  show_contact_phone: boolean
  updated_at?: string
}

export type PortfolioEvent = {
  id?: string
  display_number: string
  sort_order: number
  title: LocalizedString
  description: LocalizedString
  detail_description: LocalizedString
  gallery_media: EventGalleryMedia[]
  media_url: string | null
  media_type: 'image' | 'video' | 'none'
  visual_style: string
  link_url: string | null
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export type PortfolioEventSummary = Pick<PortfolioEvent,
  'id' | 'display_number' | 'sort_order' | 'title' | 'description' | 'media_url' | 'media_type' | 'visual_style' | 'link_url' | 'is_active' | 'created_at' | 'updated_at'
>

export type PublicSiteContent = {
  settings: SiteSettings
  events: PortfolioEventSummary[]
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: 'primary',
  hero_media_url: null,
  hero_media_type: 'image',
  hero_scanlines_enabled: true,
  about_copy: {
    en: {
      eyebrow: 'BUILT FOR THE ROOM',
      title: 'A little strange.\nA lot of feeling.',
      body: 'Deltran Funker is a video jockey and visual artist creating live audiovisual worlds. Mixing 2D and 3D art, shaders, motion graphics, and internet language, each performance bends digital matter around the energy of the room.',
    },
    es: {
      eyebrow: 'HECHO PARA EL ESPACIO',
      title: 'Un poco extraño.\nMucho sentimiento.',
      body: 'Deltran Funker es VJ y artista visual, creando mundos audiovisuales en vivo. Combina arte 2D y 3D, shaders, motion graphics y lenguaje de internet para transformar cada espacio con la energía del momento.',
    },
    pt: {
      eyebrow: 'FEITO PARA O ESPAÇO',
      title: 'Um pouco estranho.\nMuito sentimento.',
      body: 'Deltran Funker é VJ e artista visual, criando mundos audiovisuais ao vivo. Combina arte 2D e 3D, shaders, motion graphics e linguagem de internet para transformar cada espaço com a energia do momento.',
    },
  },
  contact_email: 'deltranfunker@gmail.com',
  contact_instagram: 'https://www.instagram.com/deltranfunker/',
  contact_phone: null,
  show_contact_email: true,
  show_contact_instagram: true,
  show_contact_phone: false,
}

const DEFAULT_EVENT_IMAGE_URL = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DeltranFunker3.23.png-QxaAIZuw9EfIrFGmK8edVpV93JNGgh.jpeg'

function createDefaultEventGallery(displayNumber: string): EventGalleryMedia[] {
  return [1, 2].map((index) => ({
    id: `default-event-${displayNumber}-${index}`,
    type: 'image',
    url: DEFAULT_EVENT_IMAGE_URL,
    caption: {},
  }))
}

export const DEFAULT_EVENTS: PortfolioEvent[] = [
  {
    display_number: '01',
    sort_order: 1,
    title: { en: 'FUNKER.exe' },
    description: { en: 'Live visual system' },
    detail_description: { en: 'A live audiovisual system that transforms sound into a responsive visual world. Built for the energy of the room, each performance shifts between custom motion, realtime imagery, and unexpected digital textures.' },
    gallery_media: createDefaultEventGallery('01'),
    media_url: DEFAULT_EVENT_IMAGE_URL,
    media_type: 'image',
    visual_style: 'visual-one',
    link_url: 'https://www.instagram.com/deltranfunker/',
    is_active: true,
  },
  {
    display_number: '02',
    sort_order: 2,
    title: { en: 'KEY TO THE VOID' },
    description: { en: '3D character / realtime' },
    detail_description: { en: 'An exploration of character and atmosphere in realtime 3D. Procedural motion, sculpted forms, and shifting light open a passage into a strange, luminous space.' },
    gallery_media: createDefaultEventGallery('02'),
    media_url: DEFAULT_EVENT_IMAGE_URL,
    media_type: 'image',
    visual_style: 'visual-two',
    link_url: 'https://www.instagram.com/deltranfunker/',
    is_active: true,
  },
  {
    display_number: '03',
    sort_order: 3,
    title: { en: 'SOFT ERROR' },
    description: { en: 'Shader experiments' },
    detail_description: { en: 'Soft Error gathers small visual glitches, custom shaders, and signal noise into a study of fragile digital systems. Each experiment finds beauty in the moment an image breaks.' },
    gallery_media: [],
    media_url: null,
    media_type: 'none',
    visual_style: 'visual-three',
    link_url: 'https://www.instagram.com/deltranfunker/',
    is_active: true,
  },
]

export const DEFAULT_PUBLIC_CONTENT: PublicSiteContent = {
  settings: DEFAULT_SITE_SETTINGS,
  events: DEFAULT_EVENTS,
}

export function localizedValue(values: LocalizedString | undefined, locale: Locale): string {
  return values?.[locale] ?? values?.en ?? Object.values(values ?? {}).find(Boolean) ?? ''
}
