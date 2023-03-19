import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import "./Admin.css"
import { useGetData } from "../../hooks/Data"
import { Spinner } from '../../Components/Other/Spinner/Spinner';
import { Column, Row } from "../../Components/Other/Structure/Flex-Box/Flex-Box";
import { Form, Text, Textarea, Number } from "../../Components/Other/Form/Form";
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
        return setValue((prevState) => ({
            ...prevState,
            [id]: event.target.value,
        }))
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
        formData.append("technical_data", value.technical_data)

        const response = axios.post(process.env.API_URL + "/admin/edit", formData, { headers: { "Content-Type": "multipart/form-data" } })
        toast.promise(response, {
            loading: "loading",
            success: "added",
            error: (err) => t(err.message),
        })
    }

    if (isSuccess && data && value !== null) {

        return (
            <Column>
                <Form title='Edit item' onSubmit={send_to_backend} className="__form column">
                    Name
                    <Text id='name' value={value.name} placeholder='name' onChange={(e) => add_to_state(e, e.target.id)} />

                    <Row className="__admin_gallery">
                        <h3>Photos already on server</h3>
                        {value.photos &&
                            value.photos.map(obj => {
                                return (
                                    <Column key={obj}>
                                        <div className="__admin_lower_layer">
                                            <img alt="not found" src={process.env.API_URL + "/img/" + obj} />
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
                                    <Column key={obj.name}>
                                        <div className="__admin_lower_layer">
                                            <img alt="not found" src={URL.createObjectURL(obj)} />
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
                    <Textarea type="text" cols={12} id='text' value={value.text} placeholder='text' onChange={(e) => add_to_state(e, e.target.id)} />
                    <Row>

                        <Column>
                            Price
                            <Number step="0.01" id='price' value={value.price} placeholder='price' onChange={(e) => add_to_state(e, e.target.id)} />
                        </Column>

                        <Column>
                            Quantity
                            <Number id='quantity' value={value.quantity} placeholder='quantity' onChange={(e) => add_to_state(e, e.target.id)} />
                        </Column>

                    </Row>
                    <Column>
                        <h1>Technical data</h1>

                        <Textarea tabIndex={5} cols={20} placeholder="Text" value={value.technical_data} id="technical_data" onChange={(e) => add_to_state(e, e.target.id)} />

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