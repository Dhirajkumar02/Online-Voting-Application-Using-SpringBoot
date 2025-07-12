import { Link } from 'react-router-dom';

export default function Home() {
    return (
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
    );
}
