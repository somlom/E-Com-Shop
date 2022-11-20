import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  add_to_cart, remove_from_cart, add_many_to_cart,
  selectCount,
} from '../features/cart/cart_slice';
import "../css/Cart.scss"
import { Link } from 'react-router-dom';


export function Cart() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div className='cart'>

      <div className='add_count_to_cart'>

        <button className='increment_button' aria-label="Increment value" onClick={() => dispatch(add_to_cart({ id: '1' }))}>
          +
        </button>
        <span >{count.length}</span>
        <button className='decrement_button' aria-label="Decrement value" onClick={() => dispatch(remove_from_cart())}>
          -
        </button>
        <div>
          {count.map(data => (
            <div style={{backgroundColor: "red", color: "white"}} key={count.indexOf(data)}>
              <p>index: {count.indexOf(data)}</p>
              <p>id: {data.id}</p>
              <Link to={`/products/${data.id}`}>Go to this element</Link>
            </div>
          ))}
        </div>
      </div>

      <div className='add_count_to_cart'>
        <input aria-label="Set increment amount" value={incrementAmount} onChange={e => setIncrementAmount(e.target.value)} />
        <button className='add_amount_button' onClick={() => dispatch(add_many_to_cart(Number(incrementAmount) || 0))}>
          Add Amount
        </button>
      </div>
    </div>
  );
}
