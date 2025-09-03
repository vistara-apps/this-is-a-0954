import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/utils/auth.server";
import { CreditCard, ArrowLeft } from "lucide-react";

export const meta = () => {
  return [
    { title: "Checkout | AnimeForge" },
    { name: "description", content: "Complete your subscription purchase." },
  ];
};

export const loader = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  
  const { planId } = params;
  
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
      description: "Everything you need for professional anime websites",
      features: [
        "Access to all premium templates",
        "Priority support",
        "Advanced deployment options",
        "Custom domain support",
        "Unlimited API access",
      ],
    },
    enterprise: {
      id: "enterprise",
      name: "Enterprise",
      price: "$49.99",
      interval: "month",
      description: "For teams and businesses with advanced needs",
      features: [
        "White-label option",
        "Unlimited team members",
        "Dedicated support",
        "Custom feature development",
        "SLA guarantees",
      ],
    },
  };
  
  return json({ user, plan: plans[planId] });
};

export const action = async ({ request, params }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  
  const { planId } = params;
  
  // In a real app, we would process the payment here
  // For now, we'll just redirect to a success page
  
  return redirect(`/checkout/success?plan=${planId}`);
};

export default function Checkout() {
  const { user, plan } = useLoaderData();
  
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
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link to="/subscription" className="inline-flex items-center gap-1 text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to plans
          </Link>
          
          <h1 className="text-2xl font-semibold mb-6">Complete your purchase</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="glass-effect rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
                
                <Form method="post" className="space-y-4">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                      Name on card
                    </label>
                    <input
                      id="cardName"
                      name="cardName"
                      type="text"
                      required
                      className="w-full px-3 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                      Card number
                    </label>
                    <div className="relative">
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full pl-3 pr-10 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                        Expiry date
                      </label>
                      <input
                        id="expiry"
                        name="expiry"
                        type="text"
                        placeholder="MM/YY"
                        required
                        className="w-full px-3 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium mb-1">
                        CVC
                      </label>
                      <input
                        id="cvc"
                        name="cvc"
                        type="text"
                        placeholder="123"
                        required
                        className="w-full px-3 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-1">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      className="w-full px-3 py-2 bg-surface border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="">Select a country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="JP">Japan</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium"
                    >
                      Pay {plan.price}/{plan.interval}
                    </button>
                  </div>
                  
                  <p className="text-xs text-muted text-center mt-4">
                    By subscribing, you agree to our{" "}
                    <Link to="/terms" className="text-primary hover:text-primary/80">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:text-primary/80">
                      Privacy Policy
                    </Link>
                  </p>
                </Form>
              </div>
            </div>
            
            <div>
              <div className="glass-effect rounded-lg p-6 sticky top-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{plan.name} Plan</h3>
                    <p className="text-sm text-muted mt-1">{plan.description}</p>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted">Subtotal</span>
                      <span>{plan.price}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-muted">Tax</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex items-center justify-between mt-4 font-semibold">
                      <span>Total</span>
                      <span>{plan.price}/{plan.interval}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <h4 className="font-medium mb-2">What's included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <span className="w-5 h-5 bg-primary/20 text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

