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
  // (Hinweis: Prüfe, ob die Spalte 'password' oder 'access_code' heißt)
  const { data: entry, error } = await client
    .from('portfolio_logins')
    .select('*')
    .eq('password', body.password)
    .single()

  // Wenn kein Eintrag gefunden wurde oder ein Fehler auftrat
  if (error || !entry) {
    throw createError({ statusCode: 401, statusMessage: 'Ungültiger Code' })
  }

  // 2. Erweitertes Tracking:

  // A) Bestehende Tabelle updaten (bequem für die Übersicht)
  await client
    .from('portfolio_logins')
    .update({
      login_counter: (entry.login_counter || 0) + 1,
      last_login: new Date().toISOString()
    })
    .eq('id', entry.id)

  // B) NEU: Detaillierten Log in die zweite Tabelle schreiben
  const userAgent = getHeader(event, 'user-agent')
  const ip = getHeader(event, 'x-forwarded-for') || event.node.req.socket.remoteAddress

  await client
    .from('login_tracker')
    .insert([
      {
        visitor_id: entry.id, // Der Fremdschlüssel
        user_agent: userAgent,
        ip_address: ip
      }
    ])

  // 3. Session-Erstellung
  const sessionId = randomUUID()

  activeSessions.set(sessionId, {
    company: entry.company || 'Allgemeiner Gast',
    loginTime: new Date()
  })

  // 4. Cookies setzen
  setCookie(event, 'portfolio_session', sessionId, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 })
  setCookie(event, 'is_logged_in', 'true', { httpOnly: false, path: '/', maxAge: 60 * 60 * 24 })

  console.log(`[DB-TRACKING] Login für ${entry.company || 'Unbekannt'} detailliert erfasst.`)

  return { success: true }
})
