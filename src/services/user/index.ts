import { User } from "../../models/domain/User";
import desapegaApiClient from "../apis/desapega-api";

export const getUserById = async (id: string) => {
    return await desapegaApiClient().get<User>(`/users/${id}`);
}