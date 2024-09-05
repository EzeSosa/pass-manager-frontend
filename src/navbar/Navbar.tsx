import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
            <div className="container">
                <Link className="navbar-brand" to="#">
                    Password Manager
                </Link>
            </div>
        </nav>
    )
}

export default Navbar