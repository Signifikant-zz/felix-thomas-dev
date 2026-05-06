import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const filePath = event.context.params?.path
  if (!filePath) throw createError({ statusCode: 400 })

  const fullPath = path.resolve(process.cwd(), 'server/showcase', filePath)

  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
    const ext = path.extname(fullPath).toLowerCase()

    // Mapping der wichtigsten MIME-Types
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
    // Browser-Caching für 1 Stunde aktivieren für bessere Performance
    setResponseHeader(event, 'Cache-Control', 'public, max-age=3600')

    return fs.readFileSync(fullPath)
  }

  throw createError({ statusCode: 404, statusMessage: 'Datei nicht gefunden' })
})
