import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft } from "react-icons/ai"
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { Button } from '../../Components/Other/Buttons/Standart'
import { Form, Text, Textarea } from '../../Components/Other/Form/Form'
import { Column, Row } from '../../Components/Other/Structure/Flex-Box/Flex-Box'
import { Add_Rating } from '../../Components/Reviews/Rating/Rating'
import { useGetData } from '../../hooks/Data'
import { Spinner } from '../../Components/Other/Spinner/Spinner'


export const Add_Review = () => {

  const { id } = useParams();
  const [t] = useTranslation()

  const { isSuccess, isLoading, data } = useGetData("/products/" + id)

  const [star_index, set_star_index] = useState(0)
  const [input, setInput] = useState({})

  const onSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData();

    if (input.filename.length !== 0) {
      for (let i = 0; i < input.filename.length; i++) {
        formData.append("image", input.filename[i]);
      }
    }
    formData.append("title", input.title)
    formData.append("rating", star_index)
    formData.append("text", input.text)

    const api_response = axios.post(process.env.API_URL + "/reviews/add_review/" + id, formData, { headers: { Authorization: "Bearer " + localStorage.getItem("user") } })

    toast.promise(api_response, {
      loading: t("loading"),
      success: t("added"),
      error: (err) => t(err.message),
    });
  }

  const add_to_state = (event, value) => {
    return setInput((prevState) => ({
      ...prevState,
      [event.target.id]: value ? value : event.target.value,
    }))
  }

  if (isLoading || !data || data.length === 0) {
    return <Spinner />
  } else if (isSuccess && data.length !== 0) {
    return (
      <Column>
        <Row className='product_header'>
          <Link to={"/products/" + id}><AiOutlineArrowLeft size={35} /></Link>
          <h1>{data.name}</h1>
        </Row>
        <Form onSubmit={onSubmit}>

          Title
          <Text id="title" onChange={add_to_state} />

          Photos
          <input type="file" id="filename" multiple accept="image/*" onChange={(event) => add_to_state(event, event.target.files)} />

          Rating
          <Add_Rating id="rating" length={star_index} handle_stars={set_star_index} />

          Text
          <Textarea id="text" onChange={add_to_state} />

          <Button.Success type="submit">Submit</Button.Success>
        </Form>
      </Column>
    )
  }
}
