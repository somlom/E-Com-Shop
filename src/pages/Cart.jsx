import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  add_to_cart, remove_from_cart, add_many_to_cart,
  selectCount,
} from '../features/cart/cart_slice';
import "../css/Cart.css"
// import styles from './Counter.module.css';

export function Cart() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div className='cart'>

      <div className='add_count_to_cart'>
        <button aria-label="Increment value" onClick={() => dispatch(add_to_cart())}>
          +
        </button>
        <span >{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(remove_from_cart())}>
          -
        </button>
      </div>

      <div className='add_count_to_cart'>
        <input aria-label="Set increment amount" value={incrementAmount} onChange={e => setIncrementAmount(e.target.value)} />
        <button onClick={() => dispatch(add_many_to_cart(Number(incrementAmount) || 0))}>
          Add Amount
        </button>
      </div>
    </div>
  );
}
