import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query"

type ID = {
    id: number
}

export const useBaseQuery = <T extends ID>(
    queryKey: QueryKey,
    queryFn: () => Promise<T[]>
) => {
    const { data, isLoading, } = useQuery({
        queryKey,
        queryFn
    })

    const qc = useQueryClient()

    const createItem = (item: T) => {
        qc.setQueryData(queryKey, (old: T[]) => {
            return [...old, item]
        })
    }

    const updateItem = (item: T) => {
        qc.setQueryData(queryKey, (old: T[]) => {
            return old.map(o => o.id === item.id ? item : o)
        })
    }

    const removeItem = (id: number) => {
        qc.setQueryData(queryKey, (old: T[]) => {
            return old.filter(o => o.id !== id)
        })
    }

    const invalidate = qc.invalidateQueries({ queryKey })

    return { data, isLoading, createItem, updateItem, removeItem, invalidate }

}