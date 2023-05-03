import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const Rating = ({ className, id, length }) => {
    const max_length = 5
    const prs = { className, id }

    return (
        <div {...prs} style={{ width: 'max-content' }}>
            {[...Array(max_length)].map((_, star_index) => {
                return star_index < length ? (
                    <AiFillStar size={25} key={star_index} />
                ) : (
                    <AiOutlineStar size={25} key={star_index} />
                )
            })}
        </div>
    )
}

export const Add_Rating = ({ length, className, id, handle_stars }) => {
    const prs = { className, id }

    const stars = [1, 2, 3, 4, 5]

    return (
        <div {...prs} style={{ width: 'max-content' }}>
            {stars.map((value) => {
                if (length < value) {
                    return (
                        <AiOutlineStar
                            key={value}
                            size={25}
                            onClick={() => handle_stars(value)}
                        />
                    )
                } else {
                    return (
                        <AiFillStar
                            key={value}
                            size={25}
                            onClick={() => handle_stars(value)}
                        />
                    )
                }
            })}
        </div>
    )
}

export default Rating
