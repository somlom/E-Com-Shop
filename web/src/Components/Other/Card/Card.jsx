import './Card.css'

const get_class = (staticClass, className) => {
    if (className) {
        return staticClass + ' ' + className
    } else {
        return staticClass
    }
}

export const Card = (props) => {
    return (
        <div className={get_class('card_layout', props.classs)} {...props}>
            {props.children}
        </div>
    )
}
