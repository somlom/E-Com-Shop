import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  add_to_cart, remove_from_cart,
  selectCount,
} from '../features/cart/cart_slice';
import "../css/Cart.scss"
import { Link } from 'react-router-dom';


export function Cart() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div className='cart'>

      <span>Total {count.length} items</span>
      <div>
        {count.length === 0 ? <h1>No items here</h1> : count.map(data => (
          <div className="product_in_cart" key={count.indexOf(data)}>
            <button className='remove_item_button' onClick={() => dispatch(remove_from_cart(count.indexOf(data)))}>Remove item</button>
            <p>{data.name}</p>
            <p>price: {data.price}</p>
            <button><Link to={`/products/${data.id}`}>Go to this element</Link></button>
          </div>
        ))}
      </div>

    </div>
  );
}
