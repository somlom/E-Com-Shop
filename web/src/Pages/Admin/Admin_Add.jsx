import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import "./Admin.css"
import { Button } from "../../Components/Other/Buttons/Standart";
import { Textarea, Number, Text, Form } from "../../Components/Other/Form/Form";
import { Column, Row } from "../../Components/Other/Structure/Flex-Box/Flex-Box";


const Admin_Add = () => {

    const [input, setInput] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const add_to_state = (event) => {
        return setInput((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    }

    const send_to_backend = (event) => {
        event.preventDefault()

        const formData = new FormData()

        for (let i = 0; i < selectedFile.length; i++) {
            formData.append("image", selectedFile[i]);
        }
        formData.append("name", input.name)
        formData.append("text", input.text)
        formData.append("price", input.price)
        formData.append("quantity", input.quantity)
        formData.append("technical_data", input.technical_data)
        formData.append("product_text", JSON.stringify(input.product_text))

        const response_promise = axios.post(process.env.API_URL + "/admin/add", formData, { headers: { "Content-Type": "multipart/form-data", "Authorization": "Bearer "+localStorage.getItem("user") } })
        toast.promise(response_promise, {
            loading: "loading",
            success: "added",
            error: (err) => err.response.data || "error with adding product",
        })
    }

    const get_text_to_pic_array = (prev, pic_name, e) => {
        if (prev !== null && prev.product_text) {
            const text_found = prev.product_text.find(obj => obj.pic === pic_name)
            if (text_found) {
                text_found.text = e.target.value
                return prev.product_text
            } else {
                return [...prev.product_text, { pic: pic_name, text: e.target.value }]
            }
        } else {
            return [{ pic: pic_name, text: e.target.value }]
        }
    }

    const delete_text = (pic_name) => {
        const prev = input.product_text;
        if (prev) {
            if (prev.length > 1) {
                return prev.filter(pic_obj => pic_obj.pic !== pic_name)
            } else {
                return delete input.product_text;
            }
        } else {
            return prev
        }
    }

    return (
        <Column>
            <h1>Add item</h1>
            <Form title='Add item' onSubmit={send_to_backend} className="__form column">

                <label>Title</label>
                <Text id='name' placeholder='name' onChange={(e) => add_to_state(e)} />

                <label>Photos</label>
                <Row className="__admin_gallery">
                    {selectedFile &&
                        Array.from(selectedFile).map(obj => {
                            return (
                                <Column key={obj.name}>
                                    <div className="__admin_lower_layer">
                                        <img alt="not found" src={URL.createObjectURL(obj)} />
                                    </div>
                                    <Button.Primary type="button" onClick={() => {
                                        setSelectedFile(Array.from(selectedFile).filter((a) => a.name !== obj.name))
                                        setInput(prev => ({ ...prev, product_text: delete_text(obj.name) }))
                                    }
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
                <label>Text</label>
                <Textarea tabIndex={5} id='text' placeholder='text' onChange={(e) => add_to_state(e)} />

                {selectedFile &&
                    <div style={{ border: "1px solid black" }}>
                        <label>Body</label>
                        {Array.from(selectedFile).map((obj, i) => {
                            return (
                                <Row className={"row __admin_gallery"} key={obj.name} >
                                    <img src={URL.createObjectURL(obj)} width="200px" height="min-content" />
                                    <Textarea tabIndex={5} id='product_text' placeholder='text' onChange={(e) => setInput(prev => ({ ...prev, product_text: get_text_to_pic_array(prev, obj.name, e) }))} />
                                </Row>
                            )
                        })}
                    </div>
                }

                <label>Price</label>
                <Number id='price' step="0.01" placeholder='price' onChange={(e) => add_to_state(e)} />

                <label>Quantity</label>
                <Number id='quantity' placeholder='quantity' onChange={(e) => add_to_state(e)} />

                <h1>Technical data</h1>
                <Textarea tabIndex={5} placeholder="Text" id="technical_data" onChange={(e) => add_to_state(e)} />

                <Button.Success type="submit">Add</Button.Success>
            </Form>
        </Column>
    )
}


export default Admin_Add