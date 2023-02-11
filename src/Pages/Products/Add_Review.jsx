import React from 'react'
import { Button } from '../../Components/Other/Buttons/Standart'
import { Form, Input } from '../../Components/Other/Form/Form'

export const Add_Review = () => {
  return (
    <Form>
      <p>Title</p>
      <Input.Text />
      Stars
      <Input.Number />
      Text
      <textarea/>
      <Button.Success>Submit</Button.Success>
    </Form>
  )
}
