export type Address = {
  id: number;
  postalCode: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  uf: string;
  number: string;
  createdAt: Date;
  updatedAt: Date | null;
};