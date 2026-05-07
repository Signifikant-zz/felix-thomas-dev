import { createError, defineEventHandler, setResponseHeader } from 'h3'
import path from 'node:path'

export default defineEventHandler(async (event) => {
  const filePath = event.context.params?.path
  if (!filePath) throw createError({ statusCode: 400 })

  const storage = useStorage()
  // Nitro baut den Key aus: server:assets:showcase:ORDNER:DATEI
  // Wir suchen den Key, der mit deinem Pfad endet
  const searchPart = filePath.replace(/\//g, ':')
  const allKeys = await storage.getKeys()
  const storageKey = allKeys.find(key => key.endsWith(searchPart))

  if (storageKey && await storage.hasItem(storageKey)) {
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
    setResponseHeader(event, 'Cache-Control', 'public, max-age=3600')

    return fileContent
  }

  throw createError({ statusCode: 404, statusMessage: `Datei nicht im Storage: ${searchPart}` })
})
