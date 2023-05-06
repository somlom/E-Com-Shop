import {useEffect} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import axios from 'axios';

import {Spinner} from '../../Components/Other/Spinner/Spinner';

export const Order_Guest = () => {
    const {id} = useParams();

    useEffect( () => {
        // return () => {

        // .then(
        //     fulfilled => window.location.replace(fulfilled.data.data),
        //     () => <Navigate to={'/'} />
        // );

        const get_data = async () => {
            const response = await axios.post(
                process.env.API_URL + '/payment/pay_for_item',
                {
                    id: id,
                    quantity: 1,
                }
            );
            if (response.status === 200) {
                return window.location.replace(response.data.data);
            } else {
                return <Navigate to={'/'} />;
            }
        };

        return () => {
            get_data();
        };
    }, [id]);

    return <Spinner />;
};
