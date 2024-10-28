import { ACCESS_TOKEN } from "@/constants/names"
import { handleError } from "@/lib/handle-error"
import axios from "axios"
import instance from "./instance"
import { User } from "@/types/user"

type LoginInput = {
    useranme: string
    password: string
}

const routes = {
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    init: "/auth/spa-init"
}

const apiUrl = import.meta.env.VITE_API_URL

export async function loginUser(input: LoginInput) {
    try {
        const res = await instance.post<{
            data: { access_token: string, user: User }
        }>(routes.login, input)
        return res.data.data
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
        (`${apiUrl}${routes.refresh}`, {}, { withCredentials: true });

    if (response.status === 200) {
        const token = response.data.data.access_token
        return token
    }

    throw new Error("Failed to refresh")
}

export async function initAuth() {
    const res = await axios
        .post<{ data: { access_token: string, user: User } }>
        (`${apiUrl}${routes.init}`, {}, { withCredentials: true });
    return res.data.data
}

export async function logout() {
    await instance.post(routes.logout)
}