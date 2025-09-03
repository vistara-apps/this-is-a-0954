import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { Zap } from "lucide-react";
import { createUser, getUserByEmail, getUserByUsername } from "~/models/user.server";
import { createUserSession } from "~/utils/session.server";

export const meta = () => {
  return [
    { title: "Register | AnimeForge" },
    { name: "description", content: "Create a new AnimeForge account." },
  ];
};

export const loader = async ({ request }) => {
  // If the user is already authenticated, redirect to the dashboard
  const cookie = request.headers.get("Cookie");
  
  if (cookie && cookie.includes("__animeforge_session")) {
    return redirect("/");
  }
  
  return json({});
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const redirectTo = formData.get("redirectTo") || "/";
  
  // Validate form data
  const errors = {};
  
  if (!username || typeof username !== "string") {
    errors.username = "Username is required";
  } else if (username.length < 3) {
    errors.username = "Username must be at least 3 characters long";
  }
  
  if (!email || typeof email !== "string") {
    errors.email = "Email is required";
  } else if (!email.includes("@")) {
    errors.email = "Email is invalid";
  }
  
  if (!password || typeof password !== "string") {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }
  
  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  
  // Return errors if any
  if (Object.keys(errors).length > 0) {
    return json({ errors, values: { username, email } }, { status: 400 });
  }
  
  // Check if username or email already exists
  const existingUserByUsername = await getUserByUsername(username);
  const existingUserByEmail = await getUserByEmail(email);
  
  if (existingUserByUsername) {
    return json(
      { errors: { username: "Username already exists" }, values: { username, email } },
      { status: 400 }
    );
  }
  
  if (existingUserByEmail) {
    return json(
      { errors: { email: "Email already exists" }, values: { username, email } },
      { status: 400 }
    );
  }
  
  // Create the user
  const user = await createUser({ username, email, password });
  
  // Create a new session
  return createUserSession(user.id, redirectTo);
};

export default function Register() {
  const actionData = useActionData();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">AnimeForge</h1>
            </div>
          </div>
          <h2 className="text-2xl font-bold">Create an account</h2>
          <p className="text-muted mt-2">Sign up to get started with AnimeForge</p>
        </div>
        
        <div className="glass-effect rounded-lg p-6">
          <Form method="post" className="space-y-4">
            <input type="hidden" name="redirectTo" value={redirectTo} />
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                defaultValue={actionData?.values?.username}
                required
                className={`w-full px-3 py-2 bg-surface border rounded-md focus:outline-none focus:ring-1 focus:ring-primary ${
                  actionData?.errors?.username ? "border-red-500" : "border-border"
                }`}
              />
              {actionData?.errors?.username && (
                <p className="text-red-500 text-xs mt-1">{actionData.errors.username}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={actionData?.values?.email}
                required
                className={`w-full px-3 py-2 bg-surface border rounded-md focus:outline-none focus:ring-1 focus:ring-primary ${
                  actionData?.errors?.email ? "border-red-500" : "border-border"
                }`}
              />
              {actionData?.errors?.email && (
                <p className="text-red-500 text-xs mt-1">{actionData.errors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`w-full px-3 py-2 bg-surface border rounded-md focus:outline-none focus:ring-1 focus:ring-primary ${
                  actionData?.errors?.password ? "border-red-500" : "border-border"
                }`}
              />
              {actionData?.errors?.password && (
                <p className="text-red-500 text-xs mt-1">{actionData.errors.password}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className={`w-full px-3 py-2 bg-surface border rounded-md focus:outline-none focus:ring-1 focus:ring-primary ${
                  actionData?.errors?.confirmPassword ? "border-red-500" : "border-border"
                }`}
              />
              {actionData?.errors?.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{actionData.errors.confirmPassword}</p>
              )}
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Sign up
              </button>
            </div>
          </Form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted">Already have an account?</span>{" "}
            <Link 
              to={{
                pathname: "/login",
                search: searchParams.toString(),
              }}
              className="text-primary hover:text-primary/80 font-medium"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

