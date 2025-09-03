import { db } from "~/utils/db.server";

/**
 * Get ratings for an episode
 */
export async function getRatingsByEpisodeId(episodeId) {
  return db.rating.findMany({
    where: { episodeId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
}

/**
 * Get rating by user and episode
 */
export async function getRatingByUserAndEpisode(userId, episodeId) {
  return db.rating.findUnique({
    where: {
      episodeId_userId: {
        episodeId,
        userId,
      },
    },
  });
}

/**
 * Create or update a rating
 */
export async function upsertRating({ episodeId, userId, score }) {
  return db.rating.upsert({
    where: {
      episodeId_userId: {
        episodeId,
        userId,
      },
    },
    update: {
      score: parseInt(score),
    },
    create: {
      episodeId,
      userId,
      score: parseInt(score),
    },
  });
}

/**
 * Delete a rating
 */
export async function deleteRating(id) {
  return db.rating.delete({
    where: { id },
  });
}

/**
 * Get average rating for an episode
 */
export async function getAverageRatingForEpisode(episodeId) {
  const result = await db.rating.aggregate({
    where: { episodeId },
    _avg: {
      score: true,
    },
    _count: true,
  });
  
  return {
    average: result._avg.score || 0,
    count: result._count,
  };
}

/**
 * Get ratings by user ID
 */
export async function getRatingsByUserId(userId, { page = 1, limit = 20 } = {}) {
  const skip = (page - 1) * limit;
  
  const ratings = await db.rating.findMany({
    where: { userId },
    include: {
      episode: {
        include: {
          anime: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
  });
  
  const count = await db.rating.count({
    where: { userId },
  });
  
  return {
    ratings,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
}

