import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";
import styles from "./styles/tailwind.css";

export const links = () => [
  { rel: "stylesheet", href: styles },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
];

export const meta = () => {
  return [
    { title: "AnimeForge | Launch your dream anime website in minutes with Remix" },
    { name: "description", content: "Provides a Remix boilerplate, deployment guide, and data integration tools for building anime fan websites." },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { name: "theme-color", content: "hsl(220 15% 10%)" },
  ];
};

export const loader = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request);
  return json({ user });
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  
  let errorMessage = "An unexpected error occurred";
  let errorStatus = "500";
  
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data || error.statusText;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Error | AnimeForge</title>
      </head>
      <body>
        <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center p-4">
          <div className="glass-effect rounded-lg p-8 max-w-md w-full text-center">
            <h1 className="text-4xl font-bold mb-2">{errorStatus}</h1>
            <p className="text-muted mb-6">{errorMessage}</p>
            <a
              href="/"
              className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Go back home
            </a>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
