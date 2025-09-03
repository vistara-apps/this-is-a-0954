import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";
import { CheckCircle } from "lucide-react";

export const meta = () => {
  return [
    { title: "Subscription Successful | AnimeForge" },
    { name: "description", content: "Your subscription has been successfully processed." },
  ];
};

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  
  const url = new URL(request.url);
  const planId = url.searchParams.get("plan");
  
  // Validate plan ID
  if (!["pro", "enterprise"].includes(planId)) {
    return redirect("/subscription");
  }
  
  // Get plan details
  const plans = {
    pro: {
      id: "pro",
      name: "Pro",
      price: "$12.99",
      interval: "month",
      tier: "PRO",
    },
    enterprise: {
      id: "enterprise",
      name: "Enterprise",
      price: "$49.99",
      interval: "month",
      tier: "ENTERPRISE",
    },
  };
  
  // In a real app, we would update the user's subscription in the database
  // For now, we'll just return the plan details
  
  return json({ user, plan: plans[planId] });
};

export default function CheckoutSuccess() {
  const { user, plan } = useLoaderData();
  const [searchParams] = useSearchParams();
  
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      <header className="border-b border-border py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">AnimeForge</Link>
          <div className="text-sm text-muted">
            Logged in as <span className="font-medium">{user.username}</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto glass-effect rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-semibold mb-2">Subscription Successful!</h1>
          <p className="text-muted mb-6">
            Thank you for subscribing to the {plan.name} plan. Your account has been upgraded.
          </p>
          
          <div className="glass-effect bg-surface rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted">Plan</span>
              <span className="font-medium">{plan.name}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted">Price</span>
              <span>{plan.price}/{plan.interval}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Next billing date</span>
              <span>{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/settings"
              className="py-2 border border-border rounded-md hover:bg-surface transition-colors"
            >
              Manage Subscription
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

