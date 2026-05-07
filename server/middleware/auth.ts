export default defineEventHandler((event) => {
  const url = getRequestURL(event)

  if (url.pathname.startsWith('/api/projects') || url.pathname.startsWith('/api/view')) {
    const cookies = parseCookies(event)
    const loginValue = cookies['is_logged_in']

    if (String(loginValue) !== 'true') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Nicht autorisiert'
      })
    }
  }
})
