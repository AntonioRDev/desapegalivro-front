import { LoginDtoResponse } from "../../models/dto/LoginDtoResponse";
import { LoginDtoRequest } from "../../models/dto/LoguinDtoRequest";
import desapegaApiClient from "../apis/desapega-api";

export const login = async (credentials: LoginDtoRequest) => {
    return await desapegaApiClient().post<LoginDtoResponse>("/auth/login", credentials);
}