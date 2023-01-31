import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { useGetData } from "../../hooks/Data"
import { Spinner } from '../../components/other/Spinner/Spinner';
import "./Admin.css"


const Admin_Edit = () => {
    const { id } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [value, setValue] = useState([]);
    const { isError, isLoading, isSuccess, data } = useGetData("/products/" + id)

    useEffect(() => {
        if (data !== null) {
            setValue(data)
            setSelectedFile(data.photos)
        }
    }, [isSuccess])


    useEffect(() => {
        console.log(value.photos)
    }, [value])

    const add_to_state = (event, id) => {
        setValue((prevState) => ({
            ...prevState,
            [id]: event.target.value,
        }))
    }
    const send_to_backend = async (event) => {
        event.preventDefault()

        const formData = new FormData()

        if (selectedFile === null || selectedFile.length === 0) {
            formData.append("image", value.photos);
        } else {
            for (let i = 0; i < selectedFile.length; i++) {
                formData.append("image", selectedFile[i]);
            }
        }
        formData.append("id", id)
        formData.append("name", value.name)
        formData.append("text", value.text)
        formData.append("price", value.price)
        formData.append("quantity", value.quantity)

        await axios.post(process.env.API_URL + "/products/edit", formData, { headers: { "Content-Type": "multipart/form-data" } }).then(

            function (a) {
                console.log(a)
                return alert("added")
            },
            function (error) {
                console.log(error)
                return alert(error.response.data)
            }
        )
    }

    if (isSuccess && data && value !== null) {

        return (
            <div>
                <div className="column">
                    <h1>Edit item</h1>
                    <form title='Add item' onSubmit={send_to_backend} className="__form column">

                        <input type="text" id='name' value={value.name} placeholder='name' onChange={(e) => add_to_state(e, e.target.id)} />

                        <div className="row __admin_gellery">
                            {value.photos &&
                                value.photos.map(obj => {
                                    console.log(obj)
                                    return (
                                        <div className="column">
                                            <div className="__admin_lower_layer">
                                                <img alt="not found" key={obj} src={process.env.API_URL + "/img/" + obj} />
                                            </div>
                                            <button type="button" onClick={() =>
                                                setValue(prev => { prev, photos = value.photos.filter((a) => a !== obj) })
                                            }>Delete</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="row __admin_gellery">
                            {selectedFile &&
                                Array.from(selectedFile).map(obj => {
                                    console.log(obj)
                                    return (
                                        <div className="column">
                                            <div className="__admin_lower_layer">
                                                <img alt="not found" key={obj.lastModified} src={process.env.API_URL + "/img/" + obj || URL.createObjectURL(obj)} />
                                                {/* src={URL.createObjectURL(obj)} */}
                                            </div>
                                            <button type="button" onClick={() =>
                                                setSelectedFile(Array.from(selectedFile).filter((a) => a.name !== obj.name))
                                            }>Delete</button>
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

                        <textarea type="text" cols={12} id='text' value={value.text} placeholder='text' onChange={(e) => add_to_state(e, e.target.id)} />
                        <div className="row">

                            <input type="number" id='price' value={value.price} placeholder='price' onChange={(e) => add_to_state(e, e.target.id)} />

                            <input type="number" id='quantity' value={value.quantity} placeholder='quantity' onChange={(e) => add_to_state(e, e.target.id)} />
                        </div>
                        <div className="column">
                            <h1>Technical data</h1>
                            <input type={"text"} placeholder="Header" value={value.technical_header} id="technical_header" onChange={(e) => add_to_state(e, e.target.id)} />
                            <textarea tabIndex={5} placeholder="Text" value={value.technical_text} id="technical_text" onChange={(e) => add_to_state(e, e.target.id)} />
                        </div>
                        <button type="submit">Edit</button>
                    </form>
                </div>
            </div>
        )
    } else if (isError) {
        return <h1>Sorry, no item here</h1>
    } else {
        return <Spinner />
    }
}

export default Admin_Edit