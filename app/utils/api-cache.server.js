/**
 * Simple in-memory cache for API responses
 * In a production environment, you would use a more robust solution like Redis
 */

// Cache storage
const cache = new Map();

// Default TTL in milliseconds (5 minutes)
const DEFAULT_TTL = 5 * 60 * 1000;

/**
 * Get a value from the cache
 * @param {string} key - Cache key
 * @returns {any|null} - Cached value or null if not found or expired
 */
export function get(key) {
  if (!cache.has(key)) {
    return null;
  }
  
  const { value, expiry } = cache.get(key);
  
  // Check if the cache entry has expired
  if (expiry && expiry < Date.now()) {
    cache.delete(key);
    return null;
  }
  
  return value;
}

/**
 * Set a value in the cache
 * @param {string} key - Cache key
 * @param {any} value - Value to cache
 * @param {number} ttl - Time to live in milliseconds (optional)
 */
export function set(key, value, ttl = DEFAULT_TTL) {
  const expiry = ttl ? Date.now() + ttl : null;
  cache.set(key, { value, expiry });
}

/**
 * Delete a value from the cache
 * @param {string} key - Cache key
 */
export function del(key) {
  cache.delete(key);
}

/**
 * Clear all values from the cache
 */
export function clear() {
  cache.clear();
}

/**
 * Get a cached value or fetch it if not available
 * @param {string} key - Cache key
 * @param {Function} fetchFn - Function to fetch the value if not in cache
 * @param {number} ttl - Time to live in milliseconds (optional)
 * @returns {Promise<any>} - Cached or fetched value
 */
export async function getOrFetch(key, fetchFn, ttl = DEFAULT_TTL) {
  const cachedValue = get(key);
  
  if (cachedValue !== null) {
    return cachedValue;
  }
  
  const value = await fetchFn();
  set(key, value, ttl);
  
  return value;
}

