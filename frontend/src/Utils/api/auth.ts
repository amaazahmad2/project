import axios from "axios";
import { BASE_URL } from "./config";

const api = axios.create({
    baseURL: BASE_URL,
});

export const login = async (username: string, password: string) => {
    const response = await api.post("/api/auth/login", {
        username,
        password,
    });
    return response.data;
};

export const signup = async (username: string, password: string) => {
    const response = await api.post("/api/auth/register", {
        username,
        password,
    });
    return response.data;
};
