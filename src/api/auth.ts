import { handleError } from "@/lib/handle-error"

type LoginInput = {
    useranme: string
    password: string
}

export async function login(input: LoginInput) {
    try {
        return input
    } catch (error) {
        handleError(error)
    }
}