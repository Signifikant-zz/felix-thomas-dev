import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  // Wir greifen auf den Basis-Storage zu
  const storage = useStorage()
  // Wir suchen nach allen Keys, die unseren Showcase-Ordner enthalten
  const allKeys = await storage.getKeys()
  const showcaseKeys = allKeys.filter(key => key.includes('showcase:'))

  if (!showcaseKeys || showcaseKeys.length === 0) return []

  // Extrahiere den Projektordner (der Teil nach 'showcase:')
  const projectFolders = Array.from(new Set(showcaseKeys.map(key => {
    const parts = key.split(':')
    const idx = parts.indexOf('showcase')
    return parts[idx + 1]
  }))).filter((n): n is string => !!n)

  return projectFolders.map(projectFolderName => {
    const projectFiles = showcaseKeys.filter(key => key.includes(`:${projectFolderName}:`))

    // Formate finden (300x250, etc.)
    const formatNames = Array.from(new Set(projectFiles.map(key => {
      const parts = key.split(':')
      const idx = parts.indexOf(projectFolderName)
      return parts[idx + 1]
    }))).filter((n): n is string => !!n)

    const formats = formatNames.map(formatName => {
      const formatKey = projectFiles.find(key =>
        key.includes(`:${projectFolderName}:${formatName}:`) &&
        (key.endsWith('index.html') || key.endsWith('test.html'))
      )

      if (formatKey) {
        const fileName = formatKey.split(':').pop()
        const sizeMatch = formatName.match(/(\d+)x(\d+)/)

        return {
          name: formatName,
          url: `/api/view/${projectFolderName}/${formatName}/${fileName}`,
          width: sizeMatch ? parseInt(sizeMatch[1], 10) : null,
          height: sizeMatch ? parseInt(sizeMatch[2], 10) : null,
          isResponsive: /fireplace|wallpaper|sitebar|ds/i.test(formatName)
        }
      }
      return null
    }).filter(f => f !== null)

    return {
      id: projectFolderName,
      title: projectFolderName,
      client: projectFolderName.split('_')[1] || 'Unbekannt',
      formats
    }
  })
})
