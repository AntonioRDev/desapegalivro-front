import { DonatedBook } from "./DonatedBook";

export type Application = {
  id: number;
  userId: number;
  book: DonatedBook;
  date: Date;
  description: string;
  contact: string;
  isEmailSended: boolean;
};