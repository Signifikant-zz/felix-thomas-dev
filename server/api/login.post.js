import { randomUUID } from 'node:crypto'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const body = await readBody(event)

  if (!body.password) {
    throw createError({ statusCode: 400, statusMessage: 'Passwort fehlt' })
  }

  // Supabase Check
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
  await client.from('login_tracker').insert([{
    visitor_id: entry.id,
    user_agent: userAgent,
    ip_address: ip
  }])

  const sessionId = randomUUID()

  // Der Riegel für die Middleware
  setCookie(event, 'portfolio_session', sessionId, {
    httpOnly: true, path: '/', sameSite: 'lax', secure: true, maxAge: 60 * 60 * 24
  })

  // Das Signal für das Frontend
  setCookie(event, 'is_logged_in', 'true', {
    httpOnly: false, path: '/', sameSite: 'lax', secure: true, maxAge: 60 * 60 * 24
  })

  return { success: true }
})
