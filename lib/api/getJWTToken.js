import { authClient } from "@/lib/auth-client";

export default async function getJWTToken() {
  const { data, error } = await authClient.token();
  if (error) {
    console.error("Error fetching JWT token:", error);
    return null;
  }
  return data ? data.token : null;
}