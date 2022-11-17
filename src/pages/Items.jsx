import React from 'react'
import { Item } from '../components/Item';
import { useGetData } from '../hooks/Data'

export const Items = () => {

    const response = useGetData("http://localhost:4000/products");
    console.log(response)

    const elements = (
        (response !== false && response.length != 0) ?
            response.map((obj) => {
                // console.log(obj)
                <Item name={obj.name} />
            })
            :
            <p>spin</p>
    )

    return (
        <div className='products'>
            {/* {elements} */}
            {
                (response !== false && response.length != 0) ?

                    <Item response={response} />

                    :
                    <p>spin</p>
            }
        </div>
    )
}
