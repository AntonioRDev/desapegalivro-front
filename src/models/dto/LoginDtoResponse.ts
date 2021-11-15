import { User } from "../domain/User";

export type LoginDtoResponse = {
    user: User,
    token: string
}