import { DonatedBook } from "../../models/domain/DonatedBook";
import { DonateBookRequestDto } from "../../models/dto/DonateBookRequestDto";
import { GetFilteredBooksDtoRequest } from "../../models/dto/GetFilteredBooksDtoRequest";
import desapegaApiClient from "../apis/desapega-api";

export const getBooks = async () => {
    return await desapegaApiClient().get<DonatedBook[]>("/books");
}

export const getBooksWithoutUserBooks = async (userId: string) => {
    return await desapegaApiClient().get<DonatedBook[]>(`/books?userId=${userId}`); 
}

export const getFilteredBooks = async (filterParams: GetFilteredBooksDtoRequest) => {
    return await desapegaApiClient().post<DonatedBook[]>(`/books/filter`, filterParams);
}

export const getBookById = async (bookId: string) => {
    return await desapegaApiClient().get<DonatedBook>(`/books/${bookId}`);
}

export const donate = async (donateBookDto: DonateBookRequestDto) => {
    return await desapegaApiClient().post<DonatedBook>('/books/donate', donateBookDto);
}