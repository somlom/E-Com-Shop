import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

import "./Admin.css"
import { Button } from "../../Components/Other/Buttons/Standart";
import { Textarea, Number, Text, Form } from "../../Components/Other/Form/Form";
import { Column, Row } from "../../Components/Other/Structure/Flex-Box/Flex-Box";


const Admin_Add = () => {

    const [input, setInput] = useState("");
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
    
        const response_promise = axios.post(process.env.API_URL + "/admin/add", formData, { headers: { "Content-Type": "multipart/form-data" } })

        toast.promise(response_promise, {
            loading: "loading",
            success: "added",
            error: (err) => t(err.message),
        })

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
                <label>Text</label>
                <Textarea tabIndex={5} id='text' placeholder='text' onChange={(e) => add_to_state(e)} />

                <label>Price</label>
                <Number id='price' step="0.01" placeholder='price' onChange={(e) => add_to_state(e)} />

                <label>Quantity</label>
                <Number id='quantity' placeholder='quantity' onChange={(e) => add_to_state(e)} />

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