import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  // useStorage ist in Nuxt Server-Files global verfügbar
  const storage = useStorage('assets:server:showcase')
  const allKeys = (await storage.getKeys()) as string[]

  if (!allKeys || allKeys.length === 0) return []

  const projectFolders = Array.from(new Set(allKeys.map(key => key.split(':')[0])))
    .filter((name): name is string => !!name && name.length > 0)

  return projectFolders.map(projectFolderName => {
    const projectFiles = allKeys.filter(key => key.startsWith(projectFolderName + ':'))
    const formatNames = Array.from(new Set(projectFiles.map(key => key.split(':')[1])))
      .filter((n): n is string => !!n)

    const formats = formatNames.map(formatName => {
      const prefix = `${projectFolderName}:${formatName}:`
      const formatKey = projectFiles.find(key =>
        key.startsWith(prefix) && (key.endsWith('index.html') || key.endsWith('test.html'))
      )

      if (formatKey) {
        const keyParts = formatKey.split(':')
        const startFile = keyParts[keyParts.length - 1]
        const sizeMatch = formatName.match(/(\d+)x(\d+)/)

        let width: number | null = null
        let height: number | null = null

        if (sizeMatch && sizeMatch[1] && sizeMatch[2]) {
          width = parseInt(sizeMatch[1], 10)
          height = parseInt(sizeMatch[2], 10)
        }

        return {
          name: formatName,
          url: `/api/view/${projectFolderName}/${formatName}/${startFile}`,
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
