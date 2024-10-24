import { ACCESS_TOKEN } from "@/constants/names"
import { handleError } from "@/lib/handle-error"
import axios from "axios"
import instance from "./instance"

type LoginInput = {
    useranme: string
    password: string
}

const routes = {
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout"
}

export async function login(input: LoginInput) {
    try {
        return input
    } catch (error) {
        handleError(error)
    }
}

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN)
}

export function setAccessToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN, token)
}

export async function refreshAccessToken() {
    const response = await axios
        .post<{ data: { access_token: string } }>
        (routes.refresh, {}, { withCredentials: true });

    if (response.status === 200) {
        const token = response.data.data.access_token
        setAccessToken(token)
        return token
    }
}

export async function logout() {
    localStorage.removeItem(ACCESS_TOKEN)
    await instance.post(routes.logout)
}