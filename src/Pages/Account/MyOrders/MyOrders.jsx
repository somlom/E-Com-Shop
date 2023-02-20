import { Suspense } from 'react'
import { useTranslation } from 'react-i18next';
import { MdMoneyOff, MdAttachMoney } from "react-icons/md"
import { format } from 'date-fns'

import "./MyOrders.css"
import { Spinner } from '../../../Components/Other/Spinner/Spinner'
import { useGetData } from "../../../hooks/Data"
import { Rejected, Success } from '../../../Components/Other/Buttons/Status/Status'
import { Column, Row } from '../../../Components/Other/Structure/Flex-Box/Flex-Box'


export const MyOrders = () => {
    const [t] = useTranslation()

    const { isLoading, isSuccess, isError, data } = useGetData("/payment/get_orders", { Authorization: `Bearer ${localStorage.getItem("user")}` });

    if (isError) {

        return <h1>{t("error")}</h1>

    } else if (isLoading) {

        return <Spinner />

    } else if (isSuccess && data.length === 0) {
        return <h1>{t("no_payments")}</h1>
    } else if (isSuccess && data.length > 0) {

        return (
            <Suspense fallback={<Spinner />}>
                {data.map((obj) => <Order key={obj._id} obj={obj} />)}
            </Suspense>
        )

    }
}

const Order = ({ obj }) => {

    const [t] = useTranslation()

    return (
        <Suspense fallback={<Spinner />}>
            <Row className="card">
                <Column className='card_data'>
                    <Column className='data'>
                        <p>{format(new Date(obj.updatedAt), "dd/MM/yyyy hh:mm")}</p>
                        <p>Numm. {obj._id}</p>
                    </Column>
                    <Row>
                        {obj.payed === false ?
                            <Rejected>
                                <MdMoneyOff />
                                {t("unpayed")}
                            </Rejected>
                            :
                            <Success>
                                <MdAttachMoney />
                                {t("payed")}
                            </Success>
                        }
                    </Row>
                </Column>
                <Column className='card_amount'>
                    <h3>-{obj.amount} &euro;</h3>
                </Column>
            </Row>
        </Suspense>
    )
}