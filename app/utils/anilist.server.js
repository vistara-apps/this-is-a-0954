import { request, gql } from "graphql-request";

const ANILIST_API_URL = "https://graphql.anilist.co";

/**
 * Fetch popular anime from AniList
 */
export async function fetchPopularAnime({ page = 1, perPage = 12 } = {}) {
  const query = gql`
    query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
            native
          }
          description
          coverImage {
            large
            extraLarge
          }
          bannerImage
          genres
          averageScore
          episodes
          duration
          status
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          studios {
            nodes {
              name
            }
          }
        }
      }
    }
  `;

  try {
    const data = await request(ANILIST_API_URL, query, { page, perPage });
    return {
      anime: data.Page.media,
      pageInfo: data.Page.pageInfo,
    };
  } catch (error) {
    console.error("Error fetching from AniList:", error);
    throw new Error("Failed to fetch anime from AniList");
  }
}

/**
 * Search anime on AniList
 */
export async function searchAnime(query, { page = 1, perPage = 12 } = {}) {
  const gqlQuery = gql`
    query ($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(type: ANIME, search: $search) {
          id
          title {
            romaji
            english
            native
          }
          description
          coverImage {
            large
          }
          genres
          averageScore
          episodes
          status
          startDate {
            year
          }
        }
      }
    }
  `;

  try {
    const data = await request(ANILIST_API_URL, gqlQuery, { page, perPage, search: query });
    return {
      anime: data.Page.media,
      pageInfo: data.Page.pageInfo,
    };
  } catch (error) {
    console.error("Error searching AniList:", error);
    throw new Error("Failed to search anime on AniList");
  }
}

/**
 * Fetch anime by ID from AniList
 */
export async function fetchAnimeById(id) {
  const query = gql`
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        description
        coverImage {
          large
          extraLarge
        }
        bannerImage
        genres
        averageScore
        episodes
        duration
        status
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        studios {
          nodes {
            name
          }
        }
      }
    }
  `;

  try {
    const data = await request(ANILIST_API_URL, query, { id: parseInt(id) });
    return data.Media;
  } catch (error) {
    console.error("Error fetching anime from AniList:", error);
    throw new Error("Failed to fetch anime details from AniList");
  }
}

/**
 * Fetch seasonal anime from AniList
 */
export async function fetchSeasonalAnime({ year, season, page = 1, perPage = 12 } = {}) {
  // Default to current year and season if not provided
  if (!year || !season) {
    const date = new Date();
    year = year || date.getFullYear();
    
    // Determine current season
    const month = date.getMonth() + 1;
    if (!season) {
      if (month >= 3 && month <= 5) season = "SPRING";
      else if (month >= 6 && month <= 8) season = "SUMMER";
      else if (month >= 9 && month <= 11) season = "FALL";
      else season = "WINTER";
    }
  }

  const query = gql`
    query ($page: Int, $perPage: Int, $season: MediaSeason, $year: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media(type: ANIME, season: $season, seasonYear: $year, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
            native
          }
          description
          coverImage {
            large
          }
          genres
          averageScore
          episodes
          status
          startDate {
            year
            month
            day
          }
        }
      }
    }
  `;

  try {
    const data = await request(ANILIST_API_URL, query, { 
      page, 
      perPage, 
      season, 
      year: parseInt(year) 
    });
    
    return {
      anime: data.Page.media,
      pageInfo: data.Page.pageInfo,
      season,
      year,
    };
  } catch (error) {
    console.error("Error fetching seasonal anime from AniList:", error);
    throw new Error("Failed to fetch seasonal anime from AniList");
  }
}

