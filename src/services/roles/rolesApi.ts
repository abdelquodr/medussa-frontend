// src/services/roles/rolesApi.ts
import { apiFetch } from "./api";
import { Role } from "./types";

// const BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://medusa-backend-8vhp9gzpf-abdelquodrs-projects.vercel.app/"
//     : "http://localhost:3001"; // supposed to be in the environment .env

const BASE_URL =
  // "https://medusa-backend-8vhp9gzpf-abdelquodrs-projects.vercel.app";
  "https://medusa-backend-abdelquodr-abdelquodrs-projects.vercel.app";

export const getRoles = async (): Promise<Role[]> => {
  const url = `${BASE_URL}/api/roles`;
  return apiFetch<Role[]>(url);
};
