// src/services/roles/types.ts
export interface Role {
  _id: number;
  name: string;
  type: "DEFAULT" | "CUSTOM";
  dateCreated: string;
  status: "Active" | "In Active";
  users: number;
}
