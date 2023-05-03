import { Spinner } from '../../../Components/Other/Spinner/Spinner'
import { Column } from '../../../Components/Other/Structure/Flex-Box/Flex-Box'
import { useGetData } from '../../../hooks/Data'

export const Personal_Data = () => {
    const { isLoading, isSuccess, isError, data } = useGetData('/user', {
        authorization: 'Bearer ' + localStorage.getItem('user'),
    })

    if (isLoading || isError) {
        return <Spinner />
    } else if (isSuccess) {
        return (
            <Column>
                <p>Name: {data.name}</p>
                <p>Surname: {data.surname}</p>
                <p>Email: {data.email}</p>
                <p>Registered at {data.createdAt}</p>
            </Column>
        )
    }
}
