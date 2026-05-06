import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const baseDir = path.resolve(process.cwd(), 'server/showcase')
  if (!fs.existsSync(baseDir)) return []

  // 1. Nur die echten PROJEKT-Ordner auf der obersten Ebene lesen
  const projectFolders = fs.readdirSync(baseDir).filter(f =>
    fs.statSync(path.join(baseDir, f)).isDirectory()
  )

  return projectFolders.map(projectFolderName => {
    const projectPath = path.join(baseDir, projectFolderName)
    const formats = []

    // 2. Metadaten aus dem Hauptordner-Namen extrahieren
    const projectParts = projectFolderName.split('_')

    // 3. Jetzt die UNTERORDNER (die Banner-Formate) scannen
    const formatFolders = fs.readdirSync(projectPath).filter(f =>
      fs.statSync(path.join(projectPath, f)).isDirectory()
    )

    for (const formatName of formatFolders) {
      const formatPath = path.join(projectPath, formatName)
      const files = fs.readdirSync(formatPath)

      // Suche index oder test
      const startFile = files.find(f => f === 'test.html' || f === 'index.html')

      if (startFile) {
        const lowerName = formatName.toLowerCase()
        const isFireplace = lowerName.includes('fireplace')
        const isWallpaper = lowerName.includes('wallpaper')
        const isSitebar = lowerName.includes('ds') || lowerName.includes('sitebar')

        let width: number | null = null
        let height: number | null = null
        const sizeMatch = formatName.match(/(\d+)x(\d+)/)
        if (sizeMatch && sizeMatch[1] && sizeMatch[2]) {
          width = parseInt(sizeMatch[1])
          height = parseInt(sizeMatch[2])
        }

        // Wir fügen das Format der Liste des AKTUELLEN Projekts hinzu
        formats.push({
          name: formatName,
          url: `/api/view/${projectFolderName}/${formatName}/${startFile}`,
          width: width,
          height: height,
          isResponsive: isFireplace || isWallpaper || isSitebar
        })
      }
    }

    // Wir geben PRO PROJEKT-ORDNER genau ein Objekt zurück
    return {
      id: projectFolderName,
      title: projectFolderName,
      client: projectParts[1] || 'Unbekannt',
      formats: formats // Alle Banner landen hier drin
    }
  })
})
