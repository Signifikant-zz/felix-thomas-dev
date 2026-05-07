export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  // Schutz für Projekte-Liste und Banner-Dateien
  if (url.pathname.startsWith('/api/projects') || url.pathname.startsWith('/api/view')) {
    const loginCookie = getCookie(event, 'is_logged_in')

    // Typsicherer Check gegen String
    const isAuthenticated = String(loginCookie) === 'true'

    if (!isAuthenticated) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Nicht autorisiert'
      })
    }
  }
})
