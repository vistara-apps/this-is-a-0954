import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "~/utils/session.server";
import { verifyLogin } from "~/models/user.server";

// Create an authenticator instance
export const authenticator = new Authenticator(sessionStorage);

// Configure the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const email = form.get("email");
    const password = form.get("password");
    
    // Validate form data
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    
    if (typeof email !== "string" || typeof password !== "string") {
      throw new Error("Email and password must be strings");
    }
    
    // Verify credentials
    const user = await verifyLogin(email, password);
    
    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    return user;
  }),
  "form"
);

/**
 * Check if user has premium access
 */
export async function requirePremiumUser(request) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  
  if (user.subscriptionTier === "FREE") {
    throw new Response("Premium subscription required", { status: 403 });
  }
  
  return user;
}

/**
 * Check if user has active subscription
 */
export async function hasActiveSubscription(user) {
  if (!user) return false;
  
  if (user.subscriptionTier === "FREE") {
    return false;
  }
  
  if (!user.subscriptionEnd) {
    return false;
  }
  
  return new Date(user.subscriptionEnd) > new Date();
}

