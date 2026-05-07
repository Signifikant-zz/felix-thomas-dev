export default defineEventHandler(async (event) => {
  const storage = useStorage('assets:showcase')
  const allKeys = await storage.getKeys()

  if (allKeys.length === 0) return []

  // Projekte extrahieren und sicherstellen, dass ein Name existiert
  const projectFolders = Array.from(new Set(allKeys.map(key => key.split(':')[0])))
    .filter((name): name is string => !!name) // IDE Fix: filtert undefined/leere Namen

  return projectFolders.map(projectFolderName => {
    const projectParts = projectFolderName.split('_')
    const projectFiles = allKeys.filter(key => key.startsWith(projectFolderName + ':'))

    // Formate extrahieren und validieren
    const formatNames = Array.from(new Set(projectFiles.map(key => key.split(':')[1])))
      .filter((name): name is string => !!name) // IDE Fix: filtert undefined

    const formats = formatNames.map(formatName => {
      const formatKey = projectFiles.find(key =>
        key.startsWith(`${projectFolderName}:${formatName}:`) &&
        (key.endsWith('index.html') || key.endsWith('test.html'))
      )

      if (formatKey) {
        const keyParts = formatKey.split(':')
        const startFile = keyParts[keyParts.length - 1] // IDE Fix: sicherer Zugriff aufs Ende

        if (!startFile) return null

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

        return {
          name: formatName,
          url: `/api/view/${projectFolderName}/${formatName}/${startFile}`,
          width,
          height,
          isResponsive: isFireplace || isWallpaper || isSitebar
        }
      }
      return null
    }).filter((f): f is NonNullable<typeof f> => f !== null)

    return {
      id: projectFolderName,
      title: projectFolderName,
      client: projectParts[1] || 'Unbekannt',
      formats
    }
  })
})
