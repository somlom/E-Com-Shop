import { Link } from 'react-router-dom'

const Admin = () => {
    return (
        <div>
            <div>
                <h1>Stats</h1>
                <a
                    href="https://analytics.google.com/analytics/web/?authuser=1#/p347545906/reports/intelligenthome"
                    target={'_blank'}
                >
                    Google analytics
                </a>
            </div>
            <div>
                <Link to="/admin/add">Add</Link>
            </div>
        </div>
    )
}
export default Admin
