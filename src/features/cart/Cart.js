import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    add_to_cart, remove_from_cart, add_many_to_cart,
    selectCount,
} from './cart_slice';
// import styles from './Counter.module.css';

export function Counter() {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    return (
        <div>
            <div >
                <button

                    aria-label="Increment value"
                    onClick={() => dispatch(add_to_cart())}
                >
                    +
                </button>
                <span >{count}</span>
                <button

                    aria-label="Decrement value"
                    onClick={() => dispatch(remove_from_cart())}
                >
                    -
                </button>
            </div>
            <div >
                <input

                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={e => setIncrementAmount(e.target.value)}
                />
                <button

                    onClick={() =>
                        dispatch(add_many_to_cart(Number(incrementAmount) || 0))
                    }
                >
                    Add Amount
                </button>
            </div>
        </div>
    );
}
