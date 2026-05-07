import { defineEventHandler, getCookie, createError } from 'h3'

export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  // Nur API und View-Pfade schützen
  if (url.pathname.startsWith('/api/projects') || url.pathname.startsWith('/api/view')) {
    // 1. Direkter Cookie-Zugriff
    const cookieValue = getCookie(event, 'is_logged_in')

    // 2. Sicherheits-Check: Wir akzeptieren alles, was nach "true" aussieht
    const isAuthenticated = cookieValue === true ||
      String(cookieValue) === 'true' ||
      cookieValue === '1'

    if (!isAuthenticated) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Nicht autorisiert'
      })
    }
  }
})
