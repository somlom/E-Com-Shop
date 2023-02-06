import axios from "axios";
import React, { useState } from "react";
import { Button } from "../../Components/Other/Buttons/Standart";
import { Input } from "../../Components/Other/Form/Form";
import { Column, Row } from "../../Components/Other/Structure/Flex-Box/Flex-Box";

import "./Admin.css"


const Admin_Add = () => {

    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const add_to_state = (event) => {
        setInput((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    }

    const send_to_backend = async (event) => {
        event.preventDefault()

        const formData = new FormData()

        for (let i = 0; i < selectedFile.length; i++) {
            formData.append("image", selectedFile[i]);
        }
        formData.append("name", input.name)
        formData.append("text", input.text)
        formData.append("price", input.price)
        formData.append("quantity", input.quantity)

        await axios.post(process.env.API_URL + "/products/add", formData, { headers: { "Content-Type": "multipart/form-data" } }).then(

            function () {
                return alert("added")
            },
            function (error) {
                return alert(error.response.data.message)
            }
        )

    }

    return (
        <Column>
            <h1>Add item</h1>
            <form title='Add item' onSubmit={send_to_backend} className="__form column">

                <Input.Text id='name' placeholder='name' onChange={(e) => add_to_state(e)} />

                <Row className="__admin_gellery">
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

                <Input.Text id='text' placeholder='text' onChange={(e) => add_to_state(e)} />
                <Row>

                    <Input.Number id='price' step="0.01" placeholder='price' onChange={(e) => add_to_state(e)} />
                    <Input.Number id='quantity' placeholder='quantity' onChange={(e) => add_to_state(e)} />

                </Row>

                <Row>
                    <Column>
                        <h1>Technical data</h1>
                        <Input.Text placeholder="Header" id="technical_header" onChange={(e) => add_to_state(e)} />
                        <textarea tabIndex={5} placeholder="Text" id="technical_text" onChange={(e) => add_to_state(e)} />
                    </Column>
                </Row>
                <Button.Success type="submit">Add</Button.Success>
            </form>
        </Column>
    )
}


export default Admin_Add