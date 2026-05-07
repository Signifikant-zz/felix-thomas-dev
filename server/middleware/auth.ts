import { defineEventHandler, getCookie, createError } from 'h3'

export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  // Wir schützen nur die internen Daten und die Banner-Views
  if (url.pathname.startsWith('/api/projects') || url.pathname.startsWith('/api/view')) {
    const loginCookie = getCookie(event, 'is_logged_in')

    // Check gegen den String 'true'
    if (String(loginCookie) !== 'true') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Nicht autorisiert'
      })
    }
  }
})
