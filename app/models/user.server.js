import { db } from "~/utils/db.server";
import bcrypt from "bcryptjs";

/**
 * Get user by ID
 */
export async function getUserById(id) {
  return db.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      avatarUrl: true,
      createdAt: true,
      subscriptionTier: true,
      subscriptionEnd: true,
    },
  });
}

/**
 * Get user by username
 */
export async function getUserByUsername(username) {
  return db.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      email: true,
      avatarUrl: true,
      createdAt: true,
      subscriptionTier: true,
      subscriptionEnd: true,
    },
  });
}

/**
 * Get user by email
 */
export async function getUserByEmail(email) {
  return db.user.findUnique({
    where: { email },
  });
}

/**
 * Create a new user
 */
export async function createUser({ username, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  return db.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
}

/**
 * Update a user
 */
export async function updateUser(id, data) {
  const { password, ...rest } = data;
  
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return db.user.update({
      where: { id },
      data: {
        ...rest,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatarUrl: true,
        subscriptionTier: true,
        subscriptionEnd: true,
      },
    });
  }
  
  return db.user.update({
    where: { id },
    data: rest,
    select: {
      id: true,
      username: true,
      email: true,
      avatarUrl: true,
      subscriptionTier: true,
      subscriptionEnd: true,
    },
  });
}

/**
 * Delete a user
 */
export async function deleteUser(id) {
  return db.user.delete({
    where: { id },
  });
}

/**
 * Verify login credentials
 */
export async function verifyLogin(email, password) {
  const user = await getUserByEmail(email);
  
  if (!user) {
    return null;
  }
  
  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    return null;
  }
  
  const { password: _password, ...userWithoutPassword } = user;
  
  return userWithoutPassword;
}

/**
 * Update user subscription
 */
export async function updateUserSubscription(id, { subscriptionTier, subscriptionEnd }) {
  return db.user.update({
    where: { id },
    data: {
      subscriptionTier,
      subscriptionEnd,
    },
    select: {
      id: true,
      username: true,
      email: true,
      subscriptionTier: true,
      subscriptionEnd: true,
    },
  });
}

/**
 * Check if user has active subscription
 */
export async function hasActiveSubscription(id) {
  const user = await db.user.findUnique({
    where: { id },
    select: {
      subscriptionTier: true,
      subscriptionEnd: true,
    },
  });
  
  if (!user) {
    return false;
  }
  
  if (user.subscriptionTier === "FREE") {
    return false;
  }
  
  if (!user.subscriptionEnd) {
    return false;
  }
  
  return new Date(user.subscriptionEnd) > new Date();
}

