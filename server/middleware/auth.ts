export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  if (url.pathname.startsWith('/api/projects') || url.pathname.startsWith('/api/view')) {
    const allCookies = parseCookies(event)
    const loginCookie = allCookies['is_logged_in']

    // Das wird in den Vercel Logs sichtbar sein
    console.log(`[AUTH-DEBUG] Pfad: ${url.pathname} | Cookie gefunden: ${loginCookie}`)

    const isAuthenticated = String(loginCookie) === 'true'

    if (!isAuthenticated) {
      console.log(`[AUTH-DEBUG] Zugriff verweigert für: ${url.pathname}`)
      throw createError({
        statusCode: 401,
        statusMessage: 'Nicht autorisiert'
      })
    }
    console.log(`[AUTH-DEBUG] Zugriff erlaubt für: ${url.pathname}`)
  }
})
