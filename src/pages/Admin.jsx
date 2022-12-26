import axios from "axios";
import React, { useState } from "react";

export const Admin = () => {

    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const add_to_state = (event) => {
        setInput((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
        // console.log(input)
    }

    const send_to_backend = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("image", selectedFile)
        formData.append("name", input.name)
        formData.append("text", input.text)
        formData.append("price", input.price)
        formData.append("quantity", input.quantity)
        console.log(formData, selectedFile)


        // `http://${process.env.PUBLIC_URL}/products/add`
        await axios.post("http://localhost:4000/products/add", formData, { headers: { "Content-Type": "multipart/form-data", } }).then(

            function (fulfilled) {

                alert("added")

                return
            },
            function (error) {
                return alert(error.response.data.message)
            }
        )

    }

    return (
        <div>
            <h1>Add item</h1>
            <form title='Add item' onSubmit={send_to_backend}>

                <input type="text" id='name' placeholder='name' onChange={(e) => add_to_state(e)} />

                <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    placeholder="filename"
                    id="filename"
                />

                <img alt="not fount" width={"250px"} src={selectedFile === null ? "" : URL.createObjectURL(selectedFile)} />


                <input type="text" id='text' placeholder='text' onChange={(e) => add_to_state(e)} />

                <input type="number" id='price' placeholder='price' onChange={(e) => add_to_state(e)} />

                <input type="number" id='quantity' placeholder='quantity' onChange={(e) => add_to_state(e)} />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}
