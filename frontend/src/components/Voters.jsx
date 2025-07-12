import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

export default function Voters() {
    const [voters, setVoters] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    // Load voters on component mount
    useEffect(() => {
        fetchVoters()
    }, [])

    const fetchVoters = async () => {
        try {
            const res = await fetch('http://localhost:8082/api/voters')
            const data = await res.json()
            setVoters(data)
        } catch (error) {
            showAlert('Error', 'Failed to load voters.', 'error')
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await fetch('http://localhost:8082/api/voters/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            })
            showAlert('Success', 'Voter registered successfully!', 'success')
            setName('')
            setEmail('')
            fetchVoters()
        } catch {
            showAlert('Error', 'Voter registration failed.', 'error')
        }
    }

    const deleteVoter = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: 'This voter will be permanently deleted.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d9534f',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!',
        })

        if (confirm.isConfirmed) {
            try {
                await fetch(`http://localhost:8082/api/voters/delete/${id}`, {
                    method: 'DELETE',
                })
                showAlert('Deleted!', 'Voter has been removed.', 'success')
                fetchVoters()
            } catch {
                showAlert('Error', 'Failed to delete voter.', 'error')
            }
        }
    }

    const showAlert = (title, text, icon) => {
        Swal.fire({
            title,
            text,
            icon,
            confirmButtonColor: '#dc3545',
        })
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center text-danger">Register as a Voter</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-danger w-100">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Voter List */}
            <div className="container mt-5">
                <h3 className="text-center text-danger">Registered Voters</h3>
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Voter ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {voters.map((voter) => (
                            <tr key={voter.id}>
                                <td>{voter.id}</td>
                                <td>{voter.name}</td>
                                <td>{voter.email}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteVoter(voter.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {voters.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No voters found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
