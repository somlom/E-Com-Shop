import React, { useState } from 'react'

import { Button } from '../../Components/Other/Buttons/Standart'
import { Form, Text, Number, Textarea } from '../../Components/Other/Form/Form'


export const Add_Review = () => {

  const [input, setInput] = useState({})

  const onSubmit = (event) => {
    event.preventDefault()
    console.log(input)
  }

  const add_to_state = (event) => {
    return setInput((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }))
  }

  return (
    <Form onSubmit={onSubmit}>
      Title
      <Text id="title" onChange={add_to_state} />
      Rating
      <Number id="rating" onChange={add_to_state} />
      Text
      <Textarea id="text" onChange={add_to_state} />
      <Button.Success type="submit">Submit</Button.Success>
    </Form>
  )
}
