import { Application } from "../domain/Application";
import { DonatedBook } from "../domain/DonatedBook";

export type GetBookByUser = DonatedBook & { applications: Omit<Application, "book">[] }