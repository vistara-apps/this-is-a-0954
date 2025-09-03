import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";
import Sidebar from "~/components/Sidebar";
import { Check, X, CreditCard, Zap } from "lucide-react";

export const meta = () => {
  return [
    { title: "Subscription Plans | AnimeForge" },
    { name: "description", content: "Choose a subscription plan for AnimeForge." },
  ];
};

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  
  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      interval: "forever",
      description: "Basic access to AnimeForge",
      features: [
        "Access to basic templates",
        "Remix boilerplate code",
        "Community support",
        "Limited API access",
      ],
      limitations: [
        "No premium templates",
        "No priority support",
        "Limited deployment options",
        "No custom domains",
      ],
      cta: "Current Plan",
      disabled: user.subscriptionTier === "FREE",
    },
    {
      id: "pro",
      name: "Pro",
      price: "$12.99",
      interval: "month",
      description: "Everything you need for professional anime websites",
      features: [
        "All Free features",
        "Access to all premium templates",
        "Priority support",
        "Advanced deployment options",
        "Custom domain support",
        "Unlimited API access",
      ],
      limitations: [
        "No white-label option",
        "Limited team members (up to 3)",
      ],
      cta: user.subscriptionTier === "PRO" ? "Current Plan" : "Upgrade",
      disabled: user.subscriptionTier === "PRO",
      recommended: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$49.99",
      interval: "month",
      description: "For teams and businesses with advanced needs",
      features: [
        "All Pro features",
        "White-label option",
        "Unlimited team members",
        "Dedicated support",
        "Custom feature development",
        "SLA guarantees",
      ],
      limitations: [],
      cta: user.subscriptionTier === "ENTERPRISE" ? "Current Plan" : "Upgrade",
      disabled: user.subscriptionTier === "ENTERPRISE",
    },
  ];
  
  return json({ user, plans });
};

export default function Subscription() {
  const { user, plans } = useLoaderData();
  
  return (
    <div className="min-h-screen bg-bg text-text flex">
      <Sidebar activeView="settings" />
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold">Subscription Plans</h1>
            <p className="text-muted mt-1">Choose the plan that's right for you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`glass-effect rounded-lg overflow-hidden ${
                  plan.recommended ? "ring-2 ring-accent" : ""
                }`}
              >
                {plan.recommended && (
                  <div className="bg-accent text-white text-center py-1 text-sm font-medium">
                    Recommended
                  </div>
                )}
                
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{plan.name}</h2>
                  <div className="mt-2">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    <span className="text-muted">/{plan.interval}</span>
                  </div>
                  <p className="text-muted mt-2">{plan.description}</p>
                  
                  <div className="mt-6">
                    <Link
                      to={plan.disabled ? "#" : `/checkout/${plan.id}`}
                      className={`w-full py-2 text-center rounded-md block font-medium ${
                        plan.disabled
                          ? "bg-border text-muted cursor-not-allowed"
                          : plan.recommended
                          ? "bg-accent text-white hover:bg-accent/90"
                          : "bg-primary text-white hover:bg-primary/90"
                      } transition-colors`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations.map((limitation) => (
                      <div key={limitation} className="flex items-start gap-2">
                        <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="text-muted">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 glass-effect rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Need a custom plan?</h3>
                <p className="text-muted mt-1">Contact us for custom pricing and features</p>
              </div>
              <div className="ml-auto">
                <Link
                  to="/contact"
                  className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 glass-effect rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Current Subscription</h3>
                <p className="text-muted mt-1">
                  You are currently on the <span className="font-medium">{user.subscriptionTier}</span> plan
                  {user.subscriptionEnd && (
                    <>
                      {" "}until{" "}
                      <span className="font-medium">
                        {new Date(user.subscriptionEnd).toLocaleDateString()}
                      </span>
                    </>
                  )}
                </p>
              </div>
              <div className="ml-auto">
                <Link
                  to="/settings"
                  className="px-4 py-2 border border-border text-text rounded-md hover:bg-surface transition-colors"
                >
                  Manage Subscription
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

