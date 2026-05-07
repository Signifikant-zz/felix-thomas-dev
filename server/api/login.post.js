import { randomUUID } from 'node:crypto'
import { serverSupabaseClient } from '#supabase/server'
import { activeSessions } from '../utils/auth'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  if (!body.password) {
    throw createError({ statusCode: 400, statusMessage: 'Passwort fehlt' })
  }

  const { data: entry, error } = await client
    .from('portfolio_logins')
    .select('*')
    .eq('password', body.password)
    .single()

  if (error || !entry) {
    throw createError({ statusCode: 401, statusMessage: 'Ungültiger Code' })
  }

  const sessionId = randomUUID()
  activeSessions.set(sessionId, {
    company: entry.company || 'Gast',
    loginTime: new Date()
  })

  // Den Cookie so setzen, dass er IMMER mitgesendet wird
  setCookie(event, 'is_logged_in', 'true', {
    path: '/',
    maxAge: 60 * 60 * 24, // 24 Stunden
    sameSite: 'lax',      // Erlaubt das Senden in Iframes der gleichen Domain
    secure: true,         // Pflicht für Vercel (HTTPS)
    httpOnly: false       // Erlaubt dem Frontend den Zugriff zur Prüfung
  })

  return { success: true }
})
