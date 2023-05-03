import './Spinner.css'

export const Spinner = ({ text }) => {
    return (
        <div className="prepair_spinner">
            <div className="spinner">{text}</div>
        </div>
    )
}
