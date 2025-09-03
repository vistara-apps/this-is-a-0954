/**
 * Jikan API client (MyAnimeList unofficial API)
 * Used as a fallback for AniList API
 */

const JIKAN_API_URL = "https://api.jikan.moe/v4";

/**
 * Helper function to handle rate limiting
 * Jikan API has a rate limit of 3 requests per second
 */
async function fetchWithRateLimit(url) {
  try {
    const response = await fetch(url);
    
    // Check if we hit the rate limit
    if (response.status === 429) {
      // Wait for 1 second and try again
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchWithRateLimit(url);
    }
    
    if (!response.ok) {
      throw new Error(`Jikan API error: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching from Jikan:", error);
    throw error;
  }
}

/**
 * Fetch popular anime from Jikan
 */
export async function fetchPopularAnime({ page = 1, limit = 12 } = {}) {
  const url = `${JIKAN_API_URL}/top/anime?page=${page}&limit=${limit}`;
  
  try {
    const data = await fetchWithRateLimit(url);
    
    return {
      anime: data.data,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Error fetching popular anime from Jikan:", error);
    throw new Error("Failed to fetch popular anime from Jikan");
  }
}

/**
 * Search anime on Jikan
 */
export async function searchAnime(query, { page = 1, limit = 12 } = {}) {
  const url = `${JIKAN_API_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`;
  
  try {
    const data = await fetchWithRateLimit(url);
    
    return {
      anime: data.data,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Error searching anime on Jikan:", error);
    throw new Error("Failed to search anime on Jikan");
  }
}

/**
 * Fetch anime by ID from Jikan
 */
export async function fetchAnimeById(id) {
  const url = `${JIKAN_API_URL}/anime/${id}`;
  
  try {
    const data = await fetchWithRateLimit(url);
    return data.data;
  } catch (error) {
    console.error("Error fetching anime from Jikan:", error);
    throw new Error("Failed to fetch anime details from Jikan");
  }
}

/**
 * Fetch anime episodes from Jikan
 */
export async function fetchAnimeEpisodes(animeId, { page = 1 } = {}) {
  const url = `${JIKAN_API_URL}/anime/${animeId}/episodes?page=${page}`;
  
  try {
    const data = await fetchWithRateLimit(url);
    
    return {
      episodes: data.data,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Error fetching anime episodes from Jikan:", error);
    throw new Error("Failed to fetch anime episodes from Jikan");
  }
}

/**
 * Fetch seasonal anime from Jikan
 */
export async function fetchSeasonalAnime({ year, season, page = 1, limit = 12 } = {}) {
  // Default to current year and season if not provided
  if (!year || !season) {
    const date = new Date();
    year = year || date.getFullYear();
    
    // Determine current season
    const month = date.getMonth() + 1;
    if (!season) {
      if (month >= 3 && month <= 5) season = "spring";
      else if (month >= 6 && month <= 8) season = "summer";
      else if (month >= 9 && month <= 11) season = "fall";
      else season = "winter";
    }
  }
  
  const url = `${JIKAN_API_URL}/seasons/${year}/${season.toLowerCase()}?page=${page}&limit=${limit}`;
  
  try {
    const data = await fetchWithRateLimit(url);
    
    return {
      anime: data.data,
      pagination: data.pagination,
      season,
      year,
    };
  } catch (error) {
    console.error("Error fetching seasonal anime from Jikan:", error);
    throw new Error("Failed to fetch seasonal anime from Jikan");
  }
}

