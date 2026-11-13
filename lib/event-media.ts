export function normalizeEventEmbedUrl(value: string): string | null {
  let url: URL
  try {
    url = new URL(value.trim())
  } catch {
    return null
  }

  if (url.protocol !== 'https:' || url.username || url.password || url.port) return null

  const host = url.hostname.toLowerCase()
  const youtubeHosts = new Set([
    'youtu.be',
    'youtube.com',
    'www.youtube.com',
    'm.youtube.com',
    'youtube-nocookie.com',
    'www.youtube-nocookie.com',
  ])

  if (youtubeHosts.has(host)) {
    const path = url.pathname.split('/').filter(Boolean)
    const videoId = host === 'youtu.be'
      ? path[0]
      : url.searchParams.get('v') || (['embed', 'shorts', 'live'].includes(path[0]) ? path[1] : undefined)

    return videoId && /^[\w-]{11}$/.test(videoId)
      ? `https://www.youtube-nocookie.com/embed/${videoId}`
      : null
  }

  if (host === 'vimeo.com' || host === 'www.vimeo.com' || host === 'player.vimeo.com') {
    const path = url.pathname.split('/').filter(Boolean)
    const videoId = host === 'player.vimeo.com'
      ? (path[0] === 'video' ? path[1] : undefined)
      : path[0]

    if (!videoId || !/^\d{5,12}$/.test(videoId)) return null
    const privacyHash = url.searchParams.get('h')
    return `https://player.vimeo.com/video/${videoId}${privacyHash ? `?h=${encodeURIComponent(privacyHash)}` : ''}`
  }

  return null
}

export function safeGalleryMediaUrl(value: string): string | null {
  try {
    const url = new URL(value.trim())
    return url.protocol === 'https:' && !url.username && !url.password ? url.toString() : null
  } catch {
    return null
  }
}
