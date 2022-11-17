import React from 'react'
import { Item } from '../components/Item';
import { usePostData } from '../hooks/Data'

export const Items = () => {

    const response = usePostData("http://localhost:4000/products");

  return (
    response.map
  )
}
