import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Sidebar from "~/components/Sidebar";
import Settings from "~/components/Settings";

export const meta = () => {
  return [
    { title: "AnimeForge | Settings" },
    { name: "description", content: "Configure your AnimeForge account and preferences." },
  ];
};

export const loader = async () => {
  // In a real app, we would fetch user settings from a database
  const userSettings = {
    profile: {
      name: "Developer",
      email: "dev@example.com",
      avatar: null,
      plan: "pro",
      planExpiry: "2024-12-31"
    },
    preferences: {
      theme: "dark",
      editorFontSize: 14,
      editorTabSize: 2,
      autoSave: true,
      notifications: {
        deployments: true,
        updates: true,
        newsletter: false
      }
    },
    apiKeys: [
      {
        id: "ak_1",
        name: "AniList API",
        key: "••••••••••••••••",
        createdAt: "2023-07-15T10:30:00Z",
        lastUsed: "2023-08-14T15:45:00Z"
      },
      {
        id: "ak_2",
        name: "Jikan API",
        key: "••••••••••••••••",
        createdAt: "2023-07-20T14:20:00Z",
        lastUsed: "2023-08-10T09:15:00Z"
      }
    ],
    billing: {
      plan: "Pro",
      amount: "$12.99",
      interval: "monthly",
      nextBilling: "2023-09-15",
      paymentMethod: {
        type: "card",
        last4: "4242",
        expiry: "04/25"
      },
      invoices: [
        {
          id: "inv_1",
          date: "2023-08-15",
          amount: "$12.99",
          status: "paid"
        },
        {
          id: "inv_2",
          date: "2023-07-15",
          amount: "$12.99",
          status: "paid"
        },
        {
          id: "inv_3",
          date: "2023-06-15",
          amount: "$12.99",
          status: "paid"
        }
      ]
    }
  };

  return json({ userSettings });
};

export default function SettingsPage() {
  const { userSettings } = useLoaderData();
  
  return (
    <div className="min-h-screen bg-bg text-text flex">
      <Sidebar activeView="settings" />
      <main className="flex-1 ml-64">
        <Settings userSettings={userSettings} />
      </main>
    </div>
  );
}

