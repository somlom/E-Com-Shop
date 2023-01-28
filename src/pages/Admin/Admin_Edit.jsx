import axios from "axios";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetData } from "../../hooks/Data"
import { Spinner } from '../../components/other/Spinner/Spinner';


export const Admin_Edit = () => {
    const { id } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [value, setValue] = useState([]);
    const { isError, isLoading, isSuccess, data } = useGetData("/products/" + id)

    React.useEffect(() => {

        console.log(data)
        setValue(data)

    }, [isSuccess])

    const add_to_state = (event) => {
        setValue((prevState) => ({
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
        formData.append("id", id)
        formData.append("name", value.name)
        formData.append("text", value.text)
        formData.append("price", value.price)
        formData.append("quantity", value.quantity)

        await axios.post(process.env.API_URL + "/products/edit", formData, { headers: { "Content-Type": "multipart/form-data" } }).then(

            function () {
                return alert("added")
            },
            function (error) {
                return alert(error.response.data.message)
            }
        )
    }

    if (isSuccess && data && value !== null) {

        console.log(value)

        return (
            <div>
                <div className="column">
                    <h1>Edit item</h1>
                    <form title='Add item' onSubmit={send_to_backend} className="__form column">

                        <input type="text" id='name' value={value.name} placeholder='name' onChange={(e) => add_to_state(e)} />

                        <div className="row __admin_gellery">
                            {value.photos.map(photo => {
                                return (
                                    <img src={require("../../public/img/" + photo)} />
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

                        <textarea type="text" cols={12} id='text' value={value.text} placeholder='text' onChange={(e) => add_to_state(e)} />
                        <div className="row">

                            <input type="number" id='price' value={value.price} placeholder='price' onChange={(e) => add_to_state(e)} />

                            <input type="number" id='quantity' value={value.quantity} placeholder='quantity' onChange={(e) => add_to_state(e)} />
                        </div>
                        <button type="submit">Add</button>
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
