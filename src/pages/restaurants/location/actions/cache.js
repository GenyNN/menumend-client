const MAX_CACHE_AGE = 60 * 60 // in seconds
const STORAGE = window.localStorage
const CACHE_KEY = 'locationCache'


function now() {
  return Math.floor(Date.now() / 1000)
}

export function saveCache(content) {
  const ts = now()
  const cachedContent = { content, ts }
  STORAGE.setItem(CACHE_KEY, JSON.stringify(cachedContent))
}

export function loadCache() {
  const rawCachedContent = STORAGE.getItem(CACHE_KEY)
  if (!rawCachedContent) {
    return
  }
  const cachedContent = JSON.parse(rawCachedContent)
  const { content, ts } = cachedContent
  const age = now() - ts
  if (age > MAX_CACHE_AGE) {
    resetCache()
    return null
  }
  return content
}

export function resetCache() {
  STORAGE.removeItem(CACHE_KEY)
}
