import { db } from "~/utils/db.server";

/**
 * Get all episodes for an anime
 */
export async function getEpisodesByAnimeId(animeId) {
  return db.episode.findMany({
    where: { animeId },
    orderBy: { episodeNumber: "asc" },
  });
}

/**
 * Get episode by ID
 */
export async function getEpisodeById(id) {
  return db.episode.findUnique({
    where: { id },
    include: {
      anime: true,
    },
  });
}

/**
 * Get episode by anime ID and episode number
 */
export async function getEpisodeByNumber(animeId, episodeNumber) {
  return db.episode.findUnique({
    where: {
      animeId_episodeNumber: {
        animeId,
        episodeNumber: parseInt(episodeNumber),
      },
    },
    include: {
      anime: true,
      comments: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              avatarUrl: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      ratings: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Create a new episode
 */
export async function createEpisode(data) {
  return db.episode.create({
    data: {
      ...data,
      episodeNumber: parseInt(data.episodeNumber),
    },
  });
}

/**
 * Update an episode
 */
export async function updateEpisode(id, data) {
  return db.episode.update({
    where: { id },
    data: {
      ...data,
      episodeNumber: data.episodeNumber ? parseInt(data.episodeNumber) : undefined,
    },
  });
}

/**
 * Delete an episode
 */
export async function deleteEpisode(id) {
  return db.episode.delete({
    where: { id },
  });
}

/**
 * Get average rating for an episode
 */
export async function getEpisodeAverageRating(episodeId) {
  const result = await db.rating.aggregate({
    where: { episodeId },
    _avg: {
      score: true,
    },
  });
  
  return result._avg.score || 0;
}

