import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";
import { Zap } from "lucide-react";

export const meta = () => {
  return [
    { title: "Login | AnimeForge" },
    { name: "description", content: "Log in to your AnimeForge account." },
  ];
};

export const loader = async ({ request }) => {
  // If the user is already authenticated, redirect to the dashboard
  const user = await authenticator.isAuthenticated(request);
  
  if (user) {
    return redirect("/");
  }
  
  return json({});
};

export const action = async ({ request }) => {
  // Get the redirect URL from the search params
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo") || "/";
  
  try {
    // Attempt to authenticate the user
    return await authenticator.authenticate("form", request, {
      successRedirect: redirectTo,
      throwOnError: true,
    });
  } catch (error) {
    // Return the error message
    return json({ error: error.message }, { status: 400 });
  }
};

export default function Login() {
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
          <h2 className="text-2xl font-bold">Welcome back</h2>
          <p className="text-muted mt-2">Log in to your account to continue</p>
        </div>
        
        <div className="glass-effect rounded-lg p-6">
          {actionData?.error && (
            <div className="bg-red-500/20 text-red-400 p-3 rounded-md mb-4">
              {actionData.error}
            </div>
          )}
          
          <Form method="post" className="space-y-4">
            <input type="hidden" name="redirectTo" value={redirectTo} />
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-primary hover:text-primary/80">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-3 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Log in
              </button>
            </div>
          </Form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted">Don't have an account?</span>{" "}
            <Link 
              to={{
                pathname: "/register",
                search: searchParams.toString(),
              }}
              className="text-primary hover:text-primary/80 font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

