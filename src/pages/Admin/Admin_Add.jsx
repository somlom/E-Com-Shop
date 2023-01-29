import axios from "axios";
import React, { useState } from "react";

import "./Admin.css"


export const Admin_Add = () => {

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
        <div className="column">
            <h1>Add item</h1>
            <form title='Add item' onSubmit={send_to_backend} className="__form column">

                <input type="text" id='name' placeholder='name' onChange={(e) => add_to_state(e)} />

                <div className="row __admin_gellery">
                    {selectedFile &&
                        Array.from(selectedFile).map(obj => {
                            return (
                                <div className="__admin_lower_layer">
                                    <img alt="not fount" key={obj.lastModified} src={URL.createObjectURL(obj)} />
                                </div>
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
                </div>

                <input type="text" id='text' placeholder='text' onChange={(e) => add_to_state(e)} />
                <div className="row">

                    <input type="number" id='price' placeholder='price' onChange={(e) => add_to_state(e)} />

                    <input type="number" id='quantity' placeholder='quantity' onChange={(e) => add_to_state(e)} />
                </div>
                <div className="row">
                    <div className="column">
                        <h1>Technical data</h1>
                        <input type={"text"} placeholder="Header" id="technical_header" onChange={(e) => add_to_state(e)}/>
                        <textarea tabIndex={5} placeholder="Text" id="technical_text" onChange={(e) => add_to_state(e)}/>
                    </div>
                    <div className="column">

                    </div>
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}
