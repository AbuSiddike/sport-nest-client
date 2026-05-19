import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

const baseURL = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;

export const authClient = createAuthClient({
  baseURL,
  fetchOptions: {
    credentials: "include",
  },
  plugins: [jwtClient()],
});

export const { useSession, signIn, signUp, signOut } = authClient;
