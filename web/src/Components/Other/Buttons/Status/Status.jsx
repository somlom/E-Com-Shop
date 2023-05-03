import './Status.css'

export const Success = ({ children }) => {
    return <p className="status success">{children}</p>
}

export const Rejected = ({ children }) => {
    return <p className="status rejected">{children}</p>
}

export const Pending = ({ children }) => {
    return <p className="status pending">{children}</p>
}

export const Status = {
    Success: Success,
    Rejected: Rejected,
    Pending: Pending,
}
