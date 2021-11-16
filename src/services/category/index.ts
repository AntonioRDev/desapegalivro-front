import { Category } from "../../models/domain/Category";
import desapegaApiClient from "../apis/desapega-api";

export const getAllCategories = async() => {
    return await desapegaApiClient().get<Category[]>('/category');
} 