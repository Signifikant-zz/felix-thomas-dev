// server/utils/auth.js

// Diese Map speichert die Sessions im RAM des Servers
export const activeSessions = new Map()

// Diese Map speichert die Counter (auch im RAM)
export const stats = new Map()

export const validateAndGetRecruiter = (inputPassword) => {
  const config = useRuntimeConfig()

  // Nuxt macht aus AUTH_PASS_test automatisch config.authPassTest
  // Wir suchen dynamisch in den RuntimeConfigs
  for (const [key, value] of Object.entries(config)) {
    if (key.startsWith('authPass') && key.replace('authPass', '').toLowerCase() === inputPassword.toLowerCase()) {
      return value // Das ist der Anzeigename (z.B. "Audi AG")
    }
  }
  return null
}

export const trackLogin = (recruiterName) => {
  const currentCount = stats.get(recruiterName) || 0
  stats.set(recruiterName, currentCount + 1)

  console.log(`[TRACKING] Login für: ${recruiterName} | Gesamt: ${currentCount + 1}`)
}
