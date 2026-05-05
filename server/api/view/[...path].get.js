import { promises as fs }     from 'fs'
import path                   from 'path'
import mime                   from 'mime'
import { activeSessions }     from '../../utils/auth'

export default defineEventHandler(async (event) => {
  // 1. Session aus dem geheimen Cookie holen
  const sessionId = getCookie(event, 'portfolio_session')
  const sessionData = activeSessions.get(sessionId)

  // 2. Prüfung: Wenn keine Session im Server-Speicher, dann Abbruch
  if (!sessionData) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Nicht autorisiert'
    })
  }

  // 3. Dateipfad zusammenbauen
  const requestedPath = event.context.params.path
  const filePath = path.join(process.cwd(), 'server/showcase', requestedPath)

  try {
    // 4. Datei lesen
    const file = await fs.readFile(filePath)

    // 5. Header setzen für korrekte Darstellung und Iframe-Sicherheit
    const extension = path.extname(filePath)
    const contentType = mime.getType(extension) || 'text/plain'

    setResponseHeader(event, 'Content-Type', contentType)
    setResponseHeader(event, 'X-Frame-Options', 'SAMEORIGIN')
    setResponseHeader(event, 'Content-Security-Policy', "frame-ancestors 'self'")

    return file
  } catch (e) {
    // Falls ein Iframe eine Datei anfragt, die im Repo nicht existiert
    throw createError({
      statusCode: 404,
      statusMessage: 'Datei nicht gefunden'
    })
  }
})
