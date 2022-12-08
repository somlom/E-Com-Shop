import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'

import "../css/Products.scss"
import { usePostData } from '../hooks/Data';
import { Spinner } from './Spinner';
import { add_to_cart } from '../features/cart/cart_slice';


export const Product = (props) => {

    const { response } = props;
    const { id } = useParams();

    if (!response) {

        const { value, Spinner } = usePostData("http://" + process.env.PUBLIC_URL + "/products/", { id: id })
        const dispatch = useDispatch();

        return (
            // <React.Suspense fallback={<Spinner />}>
            value.length === 0 ? <Spinner /> : (<div className='product_on_page' >
                <span>/ <Link to="/products">products</Link> / <Link to={`/products/${value._id}`}>{value.name}</Link></span>
                <img className='data_about_product' src='data:image/jpeg;base64,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'></img>
                <div className='data_about_product'>
                    <h3>{value.name}</h3>
                    <p>{value.text}</p>
                    <p>Price: {value.price}</p>
                    <button className='add_to_cart_button' type='button' onClick={() => { dispatch(add_to_cart(value._id)) }}>Add to cart</button>
                </div>
            </div >)

            // </React.Suspense>
        )

    } else {

        return (
            <React.Suspense fallback={<Spinner />}>
                <Link to={`/products/${response._id}`} className="go_to_product">
                    <div className='product'>
                        <img src='data:image/jpeg;base64,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'></img>
                        <h3>{response.name}</h3>
                        <div className='price'>
                            <h3>{response.price}</h3>
                            <p>buy</p>
                        </div>

                    </div>
                </Link>
            </React.Suspense>

        )
    }
}

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const products = [
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '#',
      price: '$48',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: '#',
      price: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: '#',
      price: '$89',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'Machined Mechanical Pencil',
      href: '#',
      price: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    // More products...
  ]
  
  export default function Example() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
  
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <a key={product._id} href={product.href} className="group">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }
  