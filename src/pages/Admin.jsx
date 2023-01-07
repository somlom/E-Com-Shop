import axios from "axios";
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai"

import { Spinner } from "../components/Spinner"


export const Admin = () => {
    return (
        <div>
            <div>
                <h1>Stats</h1>
                <a href="https://analytics.google.com/analytics/web/?authuser=1#/p347545906/reports/intelligenthome" target={"_blank"}>Google analytics</a>
            </div>
            <Admin_Add />
        </div>
    )
}
export const Admin_Edit = () => {
    const { id } = useParams();

    const [selectedFile, setSelectedFile] = useState(null);

    const [value, setValue] = useState([])

    const url = "http://" + process.env.PUBLIC_URL + "/products/" + id

    React.useEffect(() => {
        const fetchData = async () => {

            const response = await axios.get(url)

            setValue(await response.data)
        }
        fetchData()
    }, [url])

    const add_to_state = (event) => {
        setValue((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }))
    }
    const send_to_backend = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("image", value.photos[0])
        formData.append("_id", id)
        formData.append("name", value.name)
        formData.append("text", value.text)
        formData.append("price", value.price)
        formData.append("quantity", value.quantity)

        await axios.post("http://localhost:4000/products/edit", formData, { headers: { "Content-Type": "multipart/form-data", } }).then(

            function () {
                return alert("added")
            },
            function (error) {
                return alert(error.response.data.message)
            }
        )
    }

    if (value.length !== 0) {

        return (
            <div className='column'>
                <form title='Add item' onSubmit={send_to_backend}>

                    <div className='product_title row'>
                        <Link to="/"><AiOutlineArrowLeft size={35} /></Link>
                        title
                        <input type="text" id='name' placeholder='name' value={value.name} onChange={(e) => add_to_state(e)} />
                    </div>
                    <div className='product_on_page' >
                        <div className="row">

                            <div className="carousel column">
                                {value.photos.map(photo => {
                                    return (
                                        <img src={`http://${process.env.PUBLIC_URL}/img/${photo}`} />
                                    )
                                })}
                            </div>

                            {/* <img src={`http://${process.env.PUBLIC_URL}/img/${value.photos[0]}`}></img> */}
                        </div>
                        <div className='buy column'>
                            text
                            <textarea type="text" cols="30" rows="10" id='text' placeholder='text' value={value.text} onChange={(e) => add_to_state(e)} />
                            <div className='buy_row'>
                                price
                                <input type="number" id='price' value={value.price} placeholder='price' onChange={(e) => add_to_state(e)} />
                                quantity
                                <input type="number" id='quantity' placeholder='quantity' value={value.quantity} onChange={(e) => add_to_state(e)} />
                            </div>
                        </div>
                    </div>
                    <input
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        placeholder="filename"
                        id="filename"
                    />
                    <button type="submit">Edit</button>
                </form>
            </div>
        )
    } else {
        return <Spinner />
    }
}
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
        formData.append("image", selectedFile)
        formData.append("name", input.name)
        formData.append("text", input.text)
        formData.append("price", input.price)
        formData.append("quantity", input.quantity)

        await axios.post("http://localhost:4000/products/add", formData, { headers: { "Content-Type": "multipart/form-data", } }).then(

            function () {
                return alert("added")
            },
            function (error) {
                return alert(error.response.data.message)
            }
        )

    }

    return (
        <div>
            <h1>Add item</h1>
            <div className="row">
                <form title='Add item' onSubmit={send_to_backend} className="column">

                    <input type="text" id='name' placeholder='name' onChange={(e) => add_to_state(e)} />

                    <input
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        placeholder="filename"
                        id="filename"
                    />

                    <input type="text" id='text' placeholder='text' onChange={(e) => add_to_state(e)} />

                    <input type="number" id='price' placeholder='price' onChange={(e) => add_to_state(e)} />

                    <input type="number" id='quantity' placeholder='quantity' onChange={(e) => add_to_state(e)} />
                    <button type="submit">Add</button>
                </form>
                <div className="column">
                    {selectedFile &&
                        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedFile)} />}
                </div>
            </div>
        </div>
    )
}
