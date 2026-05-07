import { createError, defineEventHandler, setResponseHeader } from 'h3'
import path from 'path' // Dieser Import hat gefehlt!

export default defineEventHandler(async (event) => {
  const filePath = event.context.params?.path
  if (!filePath) throw createError({ statusCode: 400, statusMessage: 'Pfad fehlt' })

  // WICHTIG: Slashes in Doppelpunkte umwandeln für Nitro Storage
  // Nitro Storage (assets:showcase) nutzt Doppelpunkte als Trenner
  const storageKey = `assets:showcase:${filePath.replace(/\//g, ':')}`
  const storage = useStorage()

  // Prüfen, ob die Datei im virtuellen Bundle existiert
  if (await storage.hasItem(storageKey)) {
    // getItemRaw liest die Datei als Buffer (wichtig für Bilder/Binary)
    const fileContent = await storage.getItemRaw(storageKey)

    if (!fileContent) {
      throw createError({ statusCode: 404, statusMessage: 'Dateiinhalt leer' })
    }

    const ext = path.extname(filePath).toLowerCase()
    const contentTypes: Record<string, string> = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.json': 'application/json',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2'
    }

    setResponseHeader(event, 'Content-Type', contentTypes[ext] || 'application/octet-stream')
    // Browser-Caching aktivieren, da sich die Banner-Assets selten ändern
    setResponseHeader(event, 'Cache-Control', 'public, max-age=3600')

    return fileContent
  }

  throw createError({ statusCode: 404, statusMessage: 'Datei im Storage nicht gefunden' })
})
