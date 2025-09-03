import { db } from "~/utils/db.server";

/**
 * Get all anime with pagination
 */
export async function getAllAnime({ page = 1, limit = 12 } = {}) {
  const skip = (page - 1) * limit;
  
  const anime = await db.anime.findMany({
    skip,
    take: limit,
    orderBy: { updatedAt: "desc" },
  });
  
  const count = await db.anime.count();
  
  return {
    anime,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
}

/**
 * Get anime by ID
 */
export async function getAnimeById(id) {
  return db.anime.findUnique({
    where: { id },
    include: {
      episodes: {
        orderBy: { episodeNumber: "asc" },
      },
    },
  });
}

/**
 * Get anime by external ID (AniList or MAL)
 */
export async function getAnimeByExternalId({ anilistId, malId }) {
  if (anilistId) {
    return db.anime.findUnique({
      where: { anilistId: parseInt(anilistId) },
    });
  }
  
  if (malId) {
    return db.anime.findUnique({
      where: { malId: parseInt(malId) },
    });
  }
  
  return null;
}

/**
 * Create a new anime
 */
export async function createAnime(data) {
  return db.anime.create({
    data: {
      ...data,
      genres: data.genres ? JSON.stringify(data.genres) : null,
    },
  });
}

/**
 * Update an anime
 */
export async function updateAnime(id, data) {
  return db.anime.update({
    where: { id },
    data: {
      ...data,
      genres: data.genres ? JSON.stringify(data.genres) : undefined,
    },
  });
}

/**
 * Delete an anime
 */
export async function deleteAnime(id) {
  return db.anime.delete({
    where: { id },
  });
}

/**
 * Search anime by title
 */
export async function searchAnime(query, { page = 1, limit = 12 } = {}) {
  const skip = (page - 1) * limit;
  
  const anime = await db.anime.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
    skip,
    take: limit,
    orderBy: { updatedAt: "desc" },
  });
  
  const count = await db.anime.count({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
  
  return {
    anime,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
}

