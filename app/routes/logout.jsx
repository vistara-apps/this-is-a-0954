import { redirect } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export const loader = async ({ request }) => {
  return authenticator.logout(request, {
    redirectTo: "/login",
  });
};

export const action = async ({ request }) => {
  return authenticator.logout(request, {
    redirectTo: "/login",
  });
};

