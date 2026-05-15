export default defineEventHandler(async (event) => {
  const storage = useStorage('assets:showcase')
  const keys = await storage.getKeys()

  return {
    message: "Prüfe virtuellen Nitro Storage",
    itemCount: keys.length,
    firstTenKeys: keys.slice(0, 10),
    allKeys: keys
  }
})
