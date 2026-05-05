import { randomUUID } from 'node:crypto'
import { serverSupabaseClient } from '#supabase/server'
import { activeSessions } from '../utils/auth'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  if (!body.password) {
    throw createError({ statusCode: 400, statusMessage: 'Passwort fehlt' })
  }

  // 1. Suche in der Supabase-Tabelle nach dem Passwort
  const { data: entry, error } = await client
    .from('portfolio_logins')
    .select('*')
    .eq('password', body.password)
    .single()

  // Wenn kein Eintrag gefunden wurde oder ein Fehler auftrat
  if (error || !entry) {
    throw createError({ statusCode: 401, statusMessage: 'Ungültiger Code' })
  }

  // 2. Tracking: Erhöhe den Login-Counter direkt in der DB
  // Wir nutzen die ID aus dem gefundenen Datenbank-Eintrag
  await client
    .from('portfolio_logins')
    .update({
      login_counter: (entry.login_counter || 0) + 1,
      last_login: new Date().toISOString()
    })
    .eq('id', entry.id)

  // 3. Session-Erstellung
  const sessionId = randomUUID()

  // Wir speichern die ID oder den Firmennamen in der Session
  activeSessions.set(sessionId, {
    company: entry.company || 'Allgemeiner Gast',
    loginTime: new Date()
  })

  // 4. Cookies setzen
  setCookie(event, 'portfolio_session', sessionId, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 })
  setCookie(event, 'is_logged_in', 'true', { httpOnly: false, path: '/', maxAge: 60 * 60 * 24 })

  console.log(`[DB-TRACKING] Login für ${entry.company || 'Unbekannt'} erfolgreich erfasst.`)

  return { success: true }
})
