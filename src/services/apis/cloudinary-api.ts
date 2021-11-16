import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_CLOUDINARY_API_URL;

export default () => {
    return axios.create({
        baseURL: baseUrl
    });
}