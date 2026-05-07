import { createError, defineEventHandler, setResponseHeader } from 'h3'
import path from 'path'

export default defineEventHandler(async (event) => {
  const filePath = event.context.params?.path
  if (!filePath) throw createError({ statusCode: 400, statusMessage: 'Pfad fehlt' })

  // WICHTIG: Da wir in der nuxt.config.ts baseName: 'showcase' definiert haben,
  // greifen wir über das Präfix 'assets:showcase' auf die Dateien zu.
  const storageKey = `assets:showcase:${filePath.replace(/\//g, ':')}`
  const storage = useStorage()

  // Wir prüfen den virtuellen Nitro-Storage (befüllt aus 'showcase_assets')
  if (await storage.hasItem(storageKey)) {
    // getItemRaw ist essenziell für Bilder und binäre Daten
    const fileContent = await storage.getItemRaw(storageKey)

    if (!fileContent) {
      throw createError({ statusCode: 404, statusMessage: 'Dateiinhalt leer' })
    }

    const ext = path.extname(filePath).toLowerCase()

    // Umfangreiches Mapping für Banner-Assets
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
      '.woff2': 'font/woff2',
      '.ttf': 'font/ttf',
      '.otf': 'font/otf'
    }

    setResponseHeader(event, 'Content-Type', contentTypes[ext] || 'application/octet-stream')
    // Browser-Caching für Performance
    setResponseHeader(event, 'Cache-Control', 'public, max-age=3600')

    return fileContent
  }

  // Falls es schiefgeht, geben wir den gesuchten Key im Fehler aus (hilft beim Debuggen)
  throw createError({
    statusCode: 404,
    statusMessage: `Datei nicht im Storage gefunden: ${storageKey}`
  })
})
