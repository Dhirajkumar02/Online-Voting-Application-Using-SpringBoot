import { NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg" style={{ background: 'linear-gradient(to right, #8b0000, #f8caca)' }}>
            <div className="container">
                <NavLink className="navbar-brand text-white fw-bold" to="/">
                    Online Voting
                </NavLink>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/voters">Voters</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/candidates">Candidates</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/voting">Voting</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/results">Results</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
