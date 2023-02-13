import React from 'react'
import { useTranslation } from 'react-i18next';
import { MdMoneyOff, MdAttachMoney } from "react-icons/md"
import { format } from 'date-fns'

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

        const new_data = {
            payed: [],
            unpayed: []
        }

        data.map(obj => {
            if (obj.payed) {
                new_data.payed.push(obj)
            } else {
                new_data.unpayed.push(obj)
            }
        })

        return (
            <>
                {new_data.payed.map((obj) => <Order key={obj._id} obj={obj} />)}
                {new_data.unpayed.map((obj) => <Order key={obj._id} obj={obj} />)}
            </>
        )

    }
}

const Order = ({ obj }) => {

    const [t] = useTranslation()

    return (
        <div className="card">
            <Column className='card_data'>
                <Row className='date_row'>
                    <p>{format(new Date(obj.updatedAt), 'dd/MM/yyyy')}</p>
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