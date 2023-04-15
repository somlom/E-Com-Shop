import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import './OrderData.css'
import { set_to_cart, remove_from_cart } from '../../features/cart_slice'
import { Row } from '../Other/Structure/Flex-Box/Flex-Box'

const OrderData = ({
    data = [{ _id: '', photos: [], name: '', quantity: '', price: '' }],
    counter = true,
    remove_btn = true,
}) => {
    const [t] = useTranslation()
    const dispatch = useDispatch()

    return data.map((obj) => (
        <Row className="order_item" key={obj._id}>
            <img
                className="order_image"
                src={process.env.API_URL + '/img/' + obj.photos[0]}
            ></img>
            <h3 id="title">{obj.name}</h3>
            <Row>
                {counter && (
                    <select
                        value={obj.quantity}
                        onChange={(e) =>
                            dispatch(
                                set_to_cart({
                                    id: obj._id,
                                    quantity: e.target.value,
                                })
                            )
                        }
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </select>
                )}
                <h3 className="close_menu">
                    {obj.price * obj.quantity} &euro;
                </h3>
                {remove_btn && (
                    <Row>
                        <button
                            onClick={() =>
                                dispatch(remove_from_cart({ id: obj._id }))
                            }
                        >
                            {t('remove')}
                        </button>
                    </Row>
                )}
            </Row>
            <Row className="open_menu">
                <h3>
                    {Math.round(obj.price * obj.quantity * 100) / 100} &euro;
                </h3>
            </Row>
        </Row>
    ))
}

export default OrderData
