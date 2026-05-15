import {
  createError,
  defineEventHandler,
  setResponseHeader,
  getCookie }                 from 'h3'
import path                   from 'node:path'

export default defineEventHandler(async (event) => {

  const sessionId = getCookie(event, 'portfolio_session')

  if (!sessionId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Nicht autorisiert'
    })
  }

  const filePath = event.context.params?.path
  if (!filePath) throw createError({ statusCode: 400 })

  const storage = useStorage()
  const allKeys = await storage.getKeys()

  // Wir bauen das Suchmuster so, dass es Slashes UND Doppelpunkte versteht
  const searchPattern = filePath.replace(/\//g, ':')

  // Wir suchen den Key, der auf den Pfad endet, egal was davor steht
  const storageKey = allKeys.find(key => key.endsWith(searchPattern))

  if (storageKey) {
    const fileContent = await storage.getItemRaw(storageKey)
    if (!fileContent) throw createError({ statusCode: 404 })

    const ext = path.extname(filePath).toLowerCase()
    const contentTypes: Record<string, string> = {
      '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
      '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
      '.gif': 'image/gif', '.svg': 'image/svg+xml', '.json': 'application/json',
      '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf'
    }

    setResponseHeader(event, 'Content-Type', contentTypes[ext] || 'application/octet-stream')
    setResponseHeader(event, 'X-Frame-Options', 'SAMEORIGIN')
    setResponseHeader(event, 'Content-Security-Policy', "frame-ancestors 'self'")

    return fileContent
  }

  throw createError({ statusCode: 404, statusMessage: 'File not found' })
})
