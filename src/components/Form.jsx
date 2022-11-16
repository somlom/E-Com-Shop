import React from 'react'
import axios from "axios"


export const usePostData = (url = "") => {

    const [value, setValue] = React.useState('')

    const fetchData = async (data) => {
        const response = await fetch(url, {
            method: "post",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: (
                data
            )
        })
        setValue(await response.json())
    }

    return [value, fetchData]

}

export const Form = async (props) => {

    // const { title } = props;
    const title = "Login"

    const [data, setData] = React.useState(null);

    // let i = 1;

    // const response = await axios.post("http://localhost:4000/get_form", { title_: title_ })
    // setData (await axios.post("http://localhost:4000/get_form", {title_: title_}));

    // React.useEffect(() => {
    //     axios.post("http://localhost:4000/get_form", title).then((res) => {
    //     console.log(res.data)    
    //     setData(res.data.fields)
    //     })

    // }, [])


    setData(usePostData("http://localhost:4000/get_form", title))


    if (data == '') {
        return <></>;
    } else {
        setData(usePostData("http://localhost:4000/get_form", title))
        return (
            
            // <div>{data.map(obj =>
            //     <input key={1}{...obj} />
            // )}</div>
            console.log(data)
        )
    }


}
