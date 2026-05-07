import fs from 'node:fs'
import path from 'node:path'
import { createError, defineEventHandler, setResponseHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const filePathParam = event.context.params?.path
  if (!filePathParam) throw createError({ statusCode: 400 })

  const safePath = path.normalize(filePathParam).replace(/^(\.\.(\/|\\|$))+/, '')
  const absolutePath = path.join(process.cwd(), 'showcase_assets', safePath)

  if (fs.existsSync(absolutePath) && fs.statSync(absolutePath).isFile()) {
    const fileContent = fs.readFileSync(absolutePath)

    const ext = path.extname(absolutePath).toLowerCase()
    const contentTypes: Record<string, string> = {
      '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
      '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
      '.gif': 'image/gif', '.svg': 'image/svg+xml', '.json': 'application/json',
      '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf'
    }

    // Header setzen
    setResponseHeader(event, 'Content-Type', contentTypes[ext] || 'application/octet-stream')
    setResponseHeader(event, 'Cache-Control', 'public, max-age=3600')

    // FIX: Erlaubt das Anzeigen der Banner in Iframes auf der gleichen Domain
    setResponseHeader(event, 'X-Frame-Options', 'SAMEORIGIN')
    setResponseHeader(event, 'Content-Security-Policy', "frame-ancestors 'self'")

    return fileContent
  }

  throw createError({ statusCode: 404, statusMessage: 'Datei nicht gefunden' })
})
