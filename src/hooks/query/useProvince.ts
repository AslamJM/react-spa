import { Province } from "@/types/province"
import { useAxios } from "../useAxios"
import { useBaseQuery } from "./create-base"

const routes = {
    all: "/province"
}

export const useProvince = () => {
    const instance = useAxios()

    const getAll = async () => {
        try {
            const res = await instance.get<{ data: Province[] }>(routes.all)
            return res.data.data
        } catch (error) {
            console.log(error);
            return []

        }
    }

    return useBaseQuery<Province>(["provinces"], getAll)

}