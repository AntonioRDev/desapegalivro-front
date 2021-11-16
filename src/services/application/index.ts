import { Application } from "../../models/domain/Application";
import { ApplyToReceiveRequest } from "../../models/dto/ApplyToReceiveRequestDto";
import desapegaApiClient from "../apis/desapega-api";

export const applyToReceiveBook = async (applyToReceiveDto: ApplyToReceiveRequest) => {
    return await desapegaApiClient().post('/application', applyToReceiveDto);
}

export const getApplicationsByUser = async (userId: string) => {
    return await desapegaApiClient().get<Application[]>(`/application/${userId}`);
}