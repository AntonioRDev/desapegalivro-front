import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default () => {
    return axios.create({
        baseURL: baseUrl,
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    });
}