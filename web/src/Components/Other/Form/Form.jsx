import { Column } from '../Structure/Flex-Box/Flex-Box'

import './Form.css'

export const Form = ({ title, onSubmit, children }) => {
    return (
        <Column className="form_content">
            <h3 className="form_title">{title}</h3>
            <form className="form column" onSubmit={onSubmit}>
                {children}
            </form>
        </Column>
    )
}

export const Email = (props) => {
    return <input type="email" {...props} />
}

export const Password = (props) => {
    return <input type="password" {...props} />
}

export const Text = (props) => {
    return <input type="text" {...props} />
}

export const Number = (props) => {
    return <input type="number" {...props} />
}

export const Textarea = (props) => {
    const { onChange, onSubmit, cols, rows, children } = props

    return (
        <textarea
            onChange={onChange}
            onSubmit={onSubmit}
            cols={cols}
            rows={rows}
            {...props}
        >
            {children}
        </textarea>
    )
}
