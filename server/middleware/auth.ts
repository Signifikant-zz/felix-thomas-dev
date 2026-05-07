export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  // Wir prüfen nur Anfragen, die auf unsere geschützten Banner oder Projektdaten gehen
  if (url.pathname.startsWith('/api/projects') || url.pathname.startsWith('/api/view')) {
    const loginCookie = getCookie(event, 'is_logged_in')

    // Typsicherer Check: Wir wandeln alles in einen String um zum Vergleich
    const isAuthenticated = String(loginCookie) === 'true'

    if (!isAuthenticated) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Nicht autorisiert - Bitte einloggen'
      })
    }
  }
})
