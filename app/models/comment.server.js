import { db } from "~/utils/db.server";

/**
 * Get comments for an episode
 */
export async function getCommentsByEpisodeId(episodeId, { page = 1, limit = 20 } = {}) {
  const skip = (page - 1) * limit;
  
  const comments = await db.comment.findMany({
    where: { episodeId },
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
    skip,
    take: limit,
  });
  
  const count = await db.comment.count({
    where: { episodeId },
  });
  
  return {
    comments,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
}

/**
 * Get comment by ID
 */
export async function getCommentById(id) {
  return db.comment.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
        },
      },
      episode: {
        include: {
          anime: true,
        },
      },
    },
  });
}

/**
 * Create a new comment
 */
export async function createComment({ episodeId, userId, content }) {
  return db.comment.create({
    data: {
      episodeId,
      userId,
      content,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
        },
      },
    },
  });
}

/**
 * Update a comment
 */
export async function updateComment(id, { content }) {
  return db.comment.update({
    where: { id },
    data: {
      content,
    },
  });
}

/**
 * Delete a comment
 */
export async function deleteComment(id) {
  return db.comment.delete({
    where: { id },
  });
}

/**
 * Get comments by user ID
 */
export async function getCommentsByUserId(userId, { page = 1, limit = 20 } = {}) {
  const skip = (page - 1) * limit;
  
  const comments = await db.comment.findMany({
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
  
  const count = await db.comment.count({
    where: { userId },
  });
  
  return {
    comments,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
}

