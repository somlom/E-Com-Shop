import React from 'react'
import { AiFillStar, AiOutlineStar } from "react-icons/ai"


export const Stars = (props) => {

    const max_length = 5;

    return (
        <div {...props} style={{ width: "max-content" }}>
            {[...Array(max_length)].map((_, star_index) => {
                return star_index < props.length ? <AiFillStar size={25} /> : <AiOutlineStar size={25} />
            })}
        </div>
    )
}
