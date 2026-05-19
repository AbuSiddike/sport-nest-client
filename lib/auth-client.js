import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

const baseURL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL,
  fetchOptions: {
    credentials: "include",
  },
  plugins: [jwtClient()],
});

export const { useSession, signIn, signUp, signOut } = authClient;
