// src/services/roles/rolesApi.ts
import { apiFetch } from "./api";
import { Role } from "./types";

const BASE_URL = "http://localhost:3001"; // supposse to be in the environemnt .env

export const getRoles = async (): Promise<Role[]> => {
  const url = `${BASE_URL}/api/roles`;
  return apiFetch<Role[]>(url);
};
