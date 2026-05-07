import { defineEventHandler, getCookie, createError } from 'h3'

export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  // Schutz für Projekte und Banner-Dateien
  if (url.pathname.startsWith('/api/projects') || url.pathname.startsWith('/api/view')) {
    const session = getCookie(event, 'portfolio_session')

    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Nicht autorisiert'
      })
    }
  }
})
