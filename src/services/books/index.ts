import { DonatedBook } from "../../models/domain/DonatedBook";
import { DonateBookRequestDto } from "../../models/dto/DonateBookRequestDto";
import { GetBookByUser } from "../../models/dto/GetBookByUser.dto";
import { GetFilteredBooksDtoRequest } from "../../models/dto/GetFilteredBooksDtoRequest";
import desapegaApiClient from "../apis/desapega-api";

export const getBooks = async () => {
    return await desapegaApiClient().get<DonatedBook[]>("/books");
}

export const getByUser = async (userId: string) => {
    return await desapegaApiClient().get<DonatedBook[]>(`/books/user/${userId}`);
}

export const getBooksWithoutUserBooks = async (userId: string) => {
    return await desapegaApiClient().get<DonatedBook[]>(`/books?userId=${userId}`); 
}

export const getFilteredBooks = async (filterParams: GetFilteredBooksDtoRequest) => {
    return await desapegaApiClient().post<DonatedBook[]>(`/books/filter`, filterParams);
}

export const getBookById = async (bookId: string) => {
    return await desapegaApiClient().get<GetBookByUser>(`/books/${bookId}`);
}

export const donate = async (donateBookDto: DonateBookRequestDto) => {
    return await desapegaApiClient().post<DonatedBook>('/books/donate', donateBookDto);
}

export const toggleBookStatus = async (bookId: string) => {
    return await desapegaApiClient().put<DonatedBook>(`books/${bookId}/toggleStatus`);
}