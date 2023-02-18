import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next';
import { MdMoneyOff, MdAttachMoney } from "react-icons/md"
import { format, sub } from 'date-fns'

import "./MyOrders.css"
import { Spinner } from '../../../Components/Other/Spinner/Spinner'
import { useGetData } from "../../../hooks/Data"
import { Rejected, Success } from '../../../Components/Other/Buttons/Status/Status'
import { Column, Row } from '../../../Components/Other/Structure/Flex-Box/Flex-Box'


export const MyOrders = () => {

    const { isLoading, isSuccess, isError, data } = useGetData("/payment/get_orders", { Authorization: `Bearer ${localStorage.getItem("user")}` });

    if (isError) {

        return <h1>{t("error")}</h1>

    } else if (isLoading) {

        return <Spinner />

    } else if (isSuccess) {

        return (
            <Suspense fallback={<Spinner />}>
                {data.map((obj) => <Order key={obj._id} obj={obj} />)}
            </Suspense>
        )

    }
}

const Order = ({ obj }) => {

    const locales = {
        de:"de",
        us:"us",
        ru:"ru",
    }

    const [t] = useTranslation()
    // return format(date, formatStr, {
    //     locale: locales[window.__localeId__] // or global.__localeId__
    // })
    // sub()
    return (
        <div className="card">
            <Column className='card_data'>
                <Row className='date_row'>
                    <p>{format(new Date(obj.updatedAt), 'dd/MM/yyyy hh:mm', {
                        locale: locales[window.__localeId__] // or global.__localeId__
                    })}</p>
                    <p>Numm. {obj._id}</p>
                </Row>
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
        </div>
    )
}