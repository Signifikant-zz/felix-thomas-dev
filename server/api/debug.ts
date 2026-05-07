import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const pathsToCheck = {
    cwd: process.cwd(),
    showcase: path.resolve(process.cwd(), 'server/showcase'),
    outputShowcase: path.resolve(process.cwd(), '.output/server/server/showcase')
  }

  const results: any = {}

  for (const [name, p] of Object.entries(pathsToCheck)) {
    results[name] = {
      path: p,
      exists: fs.existsSync(p),
      isDir: fs.existsSync(p) ? fs.statSync(p).isDirectory() : false,
      content: fs.existsSync(p) && fs.statSync(p).isDirectory() ? fs.readdirSync(p) : []
    }
  }

  return results
})
