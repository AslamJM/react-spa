export function handleError(error: unknown) {
    return {
        success: false,
        data: null,
        message: "Action Failed"
    }
}