import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Home() {
    const location = useLocation()

    // Highlight active navbar link on page load
    useEffect(() => {
        const currentPage = location.pathname
        const navLinks = document.querySelectorAll('.nav-link')
        navLinks.forEach((link) => {
            const href = link.getAttribute('href')
            if (href && currentPage.endsWith(href)) {
                link.classList.add('active')
            } else {
                link.classList.remove('active')
            }
        })
    }, [location])

    return (
        <>
            {/* Navbar */}
            <nav
                className="navbar navbar-expand-lg"
                style={{ background: 'linear-gradient(to right, #8b0000, #f8caca)' }}
            >
                <div className="container">
                    <Link to="/" className="navbar-brand text-white fw-bold">
                        Online Voting
                    </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to="/voters" className="nav-link text-white">
                                    Voters
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/candidates" className="nav-link text-white">
                                    Candidates
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/voting" className="nav-link text-white">
                                    Voting
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/results" className="nav-link text-white">
                                    Results
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Welcome Section */}
            <div className="container mt-5 text-center">
                <div
                    className="hero-fade-in"
                    style={{
                        background: 'linear-gradient(to right, #fdecea, #f8caca)',
                        color: '#8b0000',
                        padding: '50px',
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        transition: '0.5s ease-in-out',
                    }}
                >
                    <h1>Welcome to the Online Voting System</h1>
                    <p className="lead">
                        Make your voice heard in a secure and transparent way.
                    </p>
                    <Link to="/voters" className="btn btn-danger btn-lg">
                        Register & Vote
                    </Link>
                </div>
            </div>
        </>
    )
}
