export type Category = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
  isDeleted: boolean;
};