import { createCookieSessionStorage, redirect } from "@remix-run/node";

// Configure session storage
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__animeforge_session",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "s3cr3t"],
    secure: process.env.NODE_ENV === "production",
  },
});

/**
 * Create a new session with the user ID
 */
export async function createUserSession(userId, redirectTo) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

/**
 * Get the user session
 */
export async function getUserSession(request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

/**
 * Get the user ID from the session
 */
export async function getUserId(request) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  
  if (!userId || typeof userId !== "string") {
    return null;
  }
  
  return userId;
}

/**
 * Require a user to be logged in
 */
export async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  const userId = await getUserId(request);
  
  if (!userId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  
  return userId;
}

/**
 * Log out the user
 */
export async function logout(request) {
  const session = await getUserSession(request);
  
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
