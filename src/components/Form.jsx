import React from 'react'
import axios from "axios"
import { FaUserPlus } from "react-icons/fa"
import { Link } from 'react-router-dom';

export const usePostData = (url = "", data = "") => {

    const [value, setValue] = React.useState(false)

    React.useEffect(() => {
        const fetchData = async () => {

            const response = await axios.post(url, { title: data })

            setValue(await response.data)
        }
        fetchData()
    }, [url])

    return value

}

export const Form = (props) => {

    const { title, onChange, onSubmit } = props;
    const response = usePostData("http://localhost:4000/get_login_form", title)

    return (
        <div className='form_content'>
            <h3 className='form_title'>{response.title}</h3>
            <form className='form' onSubmit={onSubmit}>
                {response.fields != undefined ? <Fields fields={response.fields} onChange={onChange} /> : <p>no fields</p>}
                <div className='form_buttons'>
                    <button className="login_button opacity" type='submit'><span><FaUserPlus /></span>Login</button>
                    <button className="login_button opacity" type='button'><span><FaUserPlus /></span>Don't have an account? Register!</button>
                </div>
            </form>
        </div>
    )
}


const Fields = (props) => {

    const { fields, onChange } = props;
    return fields.map(inp => (
        <input {...inp} key={inp.name} onChange={onChange} />
    ))
}