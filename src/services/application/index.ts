import { ApplyToReceiveRequest } from "../../models/dto/ApplyToReceiveRequestDto";
import desapegaApiClient from "../apis/desapega-api";

export const applyToReceiveBook = async (applyToReceiveDto: ApplyToReceiveRequest) => {
    return await desapegaApiClient().post('/application', applyToReceiveBook);
}