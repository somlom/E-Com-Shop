import {Suspense} from 'react';
import {useTranslation} from 'react-i18next';
import axios from 'axios';
import {MdDone, MdClose} from 'react-icons/md';

import './Order.css';
import {Column, Row} from '../../Components/Other/Structure/Flex-Box/Flex-Box';
import {useGetData} from '../../hooks/Data';
import {Card} from '../../Components/Other/Card/Card';
import {Spinner} from '../../Components/Other/Spinner/Spinner';
import OrderCount from '../../Components/Order/OrderCount';
import {Pay} from '../../Components/Other/Buttons/Pay/Pay';

import OrderData from '../../Components/Order/OrderData';
import {Navigate} from 'react-router-dom';

export const Order_Status = () => {
    const params = new URLSearchParams(window.location.search);
    const order = params.get('order');
    const success = params.get('success');

    if (success && order) {
        const res = useGetData(`/payment/close_order/${order}`);
        if (res.isLoading) {
            return <Spinner />;
        } else if (res.isError) {
            <h1>Sorry, error</h1>;
        } else if (res.isSuccess) {
            if (success === 'true') {
                return <Order_Success data={res.data} />;
            } else {
                return <Order_Failed data={res.data} order={order} />;
            }
        }
    }
};

const Order_Success = ({data}) => {
    const [t] = useTranslation();

    return (
        <Column className={'order_status'}>
            <Row className={'order_status_header'}>
                <div className="order_img">
                    <MdDone size={200} />
                </div>
                <span>{t('thanks_for_order')}</span>
            </Row>
            <Column className={'order_status_body'}>
                <Suspense fallback={<Spinner />}>
                    <Card>
                        <OrderData
                            data={data}
                            counter={false}
                            remove_btn={false}
                        />
                    </Card>
                    <Card>
                        <OrderCount data={data} />
                    </Card>
                </Suspense>
            </Column>
        </Column>
    );
};

const Order_Failed = ({data, order}) => {
    const [t] = useTranslation();

    const pay_order = async () => {
        const token = localStorage.getItem('user');

        const req = await axios.get(`${process.env.API_URL}/payment/pay`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (req.status === 401) {
            return <Navigate to={'pay_for_item/' + order[0]._id} />;
        } else {
            return (
                <Navigate
                    to="/login"
                    state={{
                        next: location.pathname + location.search,
                        message: t('login_to_proceed'),
                    }}
                />
            );
        }

        // req.then(
        //     resp => window.location.replace(resp.data.data),
        //     () => (
        //         <Navigate
        //             to="/login"
        //             state={{
        //                 next: location.pathname + location.search,
        //                 message: t('login_to_proceed'),
        //             }}
        //         />
        //     )
        // );
    };

    return (
        <Column className={'order_status'}>
            <Row className={'order_status_header'}>
                <div className="order_img">
                    <MdClose size={200} />
                </div>
                <span>{t('failed_order')}</span>
            </Row>
            <Column className={'order_status_body'}>
                <Suspense fallback={<Spinner />}>
                    <Card>
                        <OrderData
                            data={data}
                            counter={false}
                            remove_btn={false}
                        />
                    </Card>
                    <Card>
                        <OrderCount data={data}>
                            <Pay onClick={pay_order}>
                                {t('try_to_pay_again')}
                            </Pay>
                        </OrderCount>
                    </Card>
                </Suspense>
            </Column>
        </Column>
    );
};
