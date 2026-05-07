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

  // Tracking
  const userAgent = getHeader(event, 'user-agent')
  const ip = getHeader(event, 'x-forwarded-for') || event.node.req.socket.remoteAddress

  await client.from('login_tracker').insert([
    {
      visitor_id: entry.id,
      user_agent: userAgent,
      ip_address: ip
    }
  ])

  const sessionId = randomUUID()
  activeSessions.set(sessionId, {
    company: entry.company || 'Allgemeiner Gast',
    loginTime: new Date()
  })

  // FIX: Cookies mit Sicherheits-Attributen für Iframes
  setCookie(event, 'portfolio_session', sessionId, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
    sameSite: 'lax',
    secure: true
  })

  setCookie(event, 'is_logged_in', 'true', {
    httpOnly: false,
    path: '/',
    maxAge: 60 * 60 * 24,
    sameSite: 'lax',
    secure: true
  })

  return { success: true }
})
