import React from 'react'
import { useTranslation } from 'react-i18next';
import { MdMoneyOff, MdAttachMoney, MdError } from "react-icons/md"
import { BsTruck } from "react-icons/bs"
import { format } from 'date-fns'

import "./MyOrders.css"
import { Spinner } from '../../Components/Other/Spinner/Spinner'
import { useGetData } from "../../hooks/Data"
import { Rejected, Success, Pending } from '../../Components/Other/Buttons/Status/Status'
import { Column, Row } from '../../Components/Other/Structure/Flex-Box/Flex-Box'


export const MyOrders = () => {

    const [t] = useTranslation();

    const { isLoading, isSuccess, isError, data } = useGetData("/payment/get_orders", { Authorization: `Bearer ${localStorage.getItem("user")}` });

    if (isError) {

        return <h1>{t("error")}</h1>

    } else if (isLoading) {

        return <Spinner />

    } else if (isSuccess) {

        return (
            data.map((obj) => {
                return (
                    <div className="card" key={obj._id}>
                        <Column className='card_data'>
                            <Row className='date_row'>
                                <p>{format(new Date(obj.updatedAt), 'dd/MM/yyyy')}</p>
                                <p>Numm. {obj._id}</p>
                            </Row>
                            <Row>
                                {obj.payed === false ? <Rejected><MdMoneyOff /> {t("not_paid")}</Rejected> : <Success><MdAttachMoney />{t("paid")}</Success>}

                                {obj.pending &&
                                    <Pending>
                                        <BsTruck />{t("pending")}
                                    </Pending>
                                }

                                {obj.delivered &&
                                    <Success>
                                        <BsTruck />{t("Delivered")}
                                    </Success>
                                }

                                {obj.rejected &&
                                    <Rejected>
                                        <MdError />{t("Rejected")}
                                    </Rejected>
                                }
                            </Row>
                        </Column>
                        <Column className='card_amount'>
                            <h3>-100 &euro;</h3>
                        </Column>
                    </div>
                )
            })
        )
    }
}
