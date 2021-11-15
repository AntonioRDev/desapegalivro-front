import { Address } from "./Address";

export type User = {
  id: number;
  name: string;
  email: string;
  address: Address;
  phone: string;
  whatsapp: string;
  createdAt: Date;
  updatedAt: Date | null;
};
