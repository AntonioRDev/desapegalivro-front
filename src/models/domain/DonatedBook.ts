import { Category } from "./Category";
import { User } from "./User";

export type DonatedBook = {
  id: number;
  user: User;
  bookCoverUrl: string;
  category: Category;
  title: string;
  usageTime: string;
  author: string;
  pagesQty: number;
  language: string;
  applicationsQty: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
};