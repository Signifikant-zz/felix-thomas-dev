import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const storage = useStorage()
  const allKeys = await storage.getKeys()

  // Filtert .DS_Store und andere Systemdateien direkt beim Laden der Keys aus
  const showcaseKeys = allKeys.filter(key =>
    key.includes('showcase:') &&
    !key.includes('.DS_Store') &&
    !key.includes('__MACOSX')
  )

  if (!showcaseKeys || showcaseKeys.length === 0) return []

  const projectFolders = Array.from(new Set(showcaseKeys.map(key => {
    const parts = key.split(':')
    const idx = parts.indexOf('showcase')
    return parts[idx + 1]
  }))).filter((n): n is string => !!n)

  return projectFolders.map(projectFolderName => {
    const projectFiles = showcaseKeys.filter(key => key.includes(`:${projectFolderName}:`))

    const formatNames = Array.from(new Set(projectFiles.map(key => {
      const parts = key.split(':')
      const idx = parts.indexOf(projectFolderName)
      return parts[idx + 1]
    }))).filter((n): n is string => !!n)

    const formats = formatNames.map(formatName => {
      const formatFiles = projectFiles.filter(key =>
        key.includes(`:${projectFolderName}:${formatName}:`)
      )

      // Gezielte Priorisierung: Suche erst test, dann index
      const formatKey = formatFiles.find(key => key.endsWith('test.html')) ||
        formatFiles.find(key => key.endsWith('index.html'))

      if (formatKey) {
        const fileName = formatKey.split(':').pop()
        const sizeMatch = formatName.match(/(\d+)x(\d+)/)

        // TYPSICHERE KONVERTIERUNG:
        // Wir stellen sicher, dass sizeMatch existiert UND die Gruppen [1] und [2] vorhanden sind
        const width = (sizeMatch && sizeMatch[1]) ? parseInt(sizeMatch[1], 10) : null
        const height = (sizeMatch && sizeMatch[2]) ? parseInt(sizeMatch[2], 10) : null

        return {
          name: formatName,
          url: `/api/view/${projectFolderName}/${formatName}/${fileName}`,
          width,
          height,
          isResponsive: /fireplace|wallpaper|sitebar|ds/i.test(formatName)
        }
      }
      return null
    }).filter((f): f is NonNullable<typeof f> => f !== null)

    return {
      id: projectFolderName,
      title: projectFolderName,
      client: projectFolderName.split('_')[1] || 'Unbekannt',
      formats
    }
  })
})
