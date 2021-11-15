import { User } from "../../models/domain/User";
import { UserRegisterDto } from "../../models/dto/UserRegisterDto";
import desapegaApiClient from "../apis/desapega-api";

export const getUserById = async (id: string) => {
    return await desapegaApiClient().get<User>(`/users/${id}`);
}

export const createUser = async (userRegisterDto: UserRegisterDto) => {
    return await desapegaApiClient().post<User>(`/users`, userRegisterDto);
}