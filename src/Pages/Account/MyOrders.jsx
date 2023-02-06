import React from 'react'
import moment from "moment"
import { useTranslation } from 'react-i18next';
import { MdMoneyOff, MdAttachMoney, MdError } from "react-icons/md"
import { BsTruck } from "react-icons/bs"

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
                const date = moment(obj.updatedAt, true).format("dddd, DD MMM HH:mm")
                return (
                    <div className="card" key={obj._id}>
                        <Column className='card_data'>
                            <Row className='date_row'>
                                <p>{date}</p>
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
