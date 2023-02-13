import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useGetData } from "../../hooks/Data"
import { Spinner } from '../../Components/Other/Spinner/Spinner';
import "./Admin.css"
import { Column, Row } from "../../Components/Other/Structure/Flex-Box/Flex-Box";
import { Form, Input } from "../../Components/Other/Form/Form";
import { Button } from "../../Components/Other/Buttons/Standart";


const Admin_Edit = () => {
    const { id } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [value, setValue] = useState({});
    const { isError, isSuccess, data } = useGetData("/products/" + id)

    useEffect(() => {
        if (data !== null) {
            setValue(data)
        }
    }, [isSuccess])

    const add_to_state = (event, id) => {
        setValue((prevState) => ({
            ...prevState,
            [id]: event.target.value,
        }))

        console.log({ [id]: event.target.value }, value)
    }

    const add_data_to_state = (event, id) => {
        // const result =  value.find(obj=>obj.header || obj.text === "")
        // setValue((prevState) => ({
        //     ...prevState,
        //     [id]: event.target.value,
        // }))
    }

    const send_to_backend = (event) => {
        event.preventDefault()

        const formData = new FormData()

        if (selectedFile !== null) {
            for (let i = 0; i < selectedFile.length; i++) {
                formData.append("image", selectedFile[i]);
            }
        }
        if (value.photos.length !== 0) {
            for (let i = 0; i < value.photos.length; i++) {
                formData.append("remaining_photos", value.photos[i]);
            }
        }

        formData.append("id", id)
        formData.append("name", value.name)
        formData.append("text", value.text)
        formData.append("price", value.price)
        formData.append("quantity", value.quantity)
        formData.append("technical_data", JSON.stringify([{ header: value.technical_header, text: value.technical_text }]))

        axios.post(process.env.API_URL + "/admin/edit", formData, { headers: { "Content-Type": "multipart/form-data" } }).then(

            function () {
                return toast.success("added")
            },
            function (error) {
                return toast.error(error.response.data)
            }
        )
    }

    if (isSuccess && data && value !== null) {

        return (
            <Column>
                <Form title='Edit item' onSubmit={send_to_backend} className="__form column">
                    Name
                    <Input.Text id='name' value={value.name} placeholder='name' onChange={(e) => add_to_state(e, e.target.id)} />

                    <Row className="__admin_gallery">
                        <h3>Photos already on server</h3>
                        {value.photos &&
                            value.photos.map(obj => {
                                return (
                                    <Column>
                                        <div className="__admin_lower_layer">
                                            <img alt="not found" key={obj} src={process.env.API_URL + "/img/" + obj} />
                                        </div>
                                        <Button.Primary type="button" onClick={() =>
                                            setValue({ ...value, photos: value.photos.filter((a) => a !== obj) })
                                        }>Delete</Button.Primary>
                                    </Column>
                                )
                            })
                        }
                    </Row>
                    <Row className="__admin_gallery">
                        <h3>Photos to load</h3>
                        {selectedFile &&
                            Array.from(selectedFile).map(obj => {
                                return (
                                    <Column>
                                        <div className="__admin_lower_layer">
                                            <img alt="not found" key={obj.lastModified} src={URL.createObjectURL(obj)} />
                                        </div>
                                        <Button.Primary type="button" onClick={() =>
                                            setSelectedFile(Array.from(selectedFile).filter((a) => a.name !== obj.name))
                                        }>Delete</Button.Primary>
                                    </Column>
                                )
                            })
                        }
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            placeholder="filename"
                            id="filename"
                            onChange={(e) => setSelectedFile((prev) => prev === null ? e.target.files : [...prev, ...e.target.files])}
                        />
                    </Row>
                    Text
                    <Input.Textarea type="text" cols={12} id='text' value={value.text} placeholder='text' onChange={(e) => add_to_state(e, e.target.id)} />
                    <Row>

                        <Column>
                            Price
                            <Input.Number step="0.01" id='price' value={value.price} placeholder='price' onChange={(e) => add_to_state(e, e.target.id)} />
                        </Column>

                        <Column>
                            Quantity
                            <Input.Number id='quantity' value={value.quantity} placeholder='quantity' onChange={(e) => add_to_state(e, e.target.id)} />
                        </Column>
                        
                    </Row>
                    <Column>
                        <h1>Technical data</h1>
                        {value.technical_data && value.technical_data.map(obj => (
                            console.log(obj),
                            <>
                                <Input.Text placeholder="Header" value={obj.header} id="technical_header" onChange={(e) => add_data_to_state(e, "header")} />
                                <Input.Textarea tabIndex={5} cols={20} placeholder="Text" value={obj.text} id="technical_text" onChange={(e) => add_data_to_state(e, "text")} />
                            </>
                        ))}
                    </Column>
                    <Button.Success type="submit">Edit</Button.Success>
                </Form>
            </Column>
        )
    } else if (isError) {
        return <h1>Sorry, no item here</h1>
    } else {
        return <Spinner />
    }
}

export default Admin_Edit