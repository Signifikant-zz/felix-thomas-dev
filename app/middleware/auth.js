export default defineNuxtRouteMiddleware(async (to) => {
  const loginCookie = useCookie('is_logged_in')

  if (process.server) return

  await nextTick()

  const isAuthenticated = loginCookie.value === true || String(loginCookie.value) === 'true'

  console.log('Finaler Check in Middleware:', {
    isAuthenticated,
    cookieWert: loginCookie.value
  })

  if (to.path.startsWith('/portfolio') && !isAuthenticated) {
    return navigateTo('/login')
  }
})
