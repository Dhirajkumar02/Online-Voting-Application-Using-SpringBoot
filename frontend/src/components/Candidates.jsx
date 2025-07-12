import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export default function Candidates() {
    const [candidates, setCandidates] = useState([])
    const [form, setForm] = useState({ name: '', party: '' })

    const API_BASE = 'http://localhost:8082/api/candidate'

    // Load candidates on component mount
    useEffect(() => {
        loadCandidates()
    }, [])

    const loadCandidates = async () => {
        try {
            const res = await fetch(API_BASE)
            const data = await res.json()
            setCandidates(data)
        } catch {
            showToast('Error loading candidates', 'error')
        }
    }

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await fetch(`${API_BASE}/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            showToast('Candidate added!', 'success')
            setForm({ name: '', party: '' })
            loadCandidates()
        } catch {
            showToast('Failed to add candidate', 'error')
        }
    }

    const editCandidate = (id) => {
        Swal.fire({
            title: 'Edit Candidate',
            html: `
        <input id="newName" class="swal2-input" placeholder="New Name" />
        <input id="newParty" class="swal2-input" placeholder="New Party" />
      `,
            showCancelButton: true,
            confirmButtonText: 'Update',
            preConfirm: () => {
                const newName = document.getElementById('newName').value
                const newParty = document.getElementById('newParty').value
                if (!newName || !newParty) {
                    Swal.showValidationMessage('Both fields are required')
                }
                return { newName, newParty }
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await fetch(`${API_BASE}/update/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: result.value.newName,
                            party: result.value.newParty,
                        }),
                    })
                    showToast('Candidate updated!', 'success')
                    loadCandidates()
                } catch {
                    showToast('Update failed', 'error')
                }
            }
        })
    }

    const deleteCandidate = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete the candidate permanently.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#d9534f',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await fetch(`${API_BASE}/delete/${id}`, {
                        method: 'DELETE',
                    })
                    showToast('Candidate deleted', 'success')
                    loadCandidates()
                } catch {
                    showToast('Delete failed', 'error')
                }
            }
        })
    }

    const showToast = (msg, type = 'info') => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: type,
            title: msg,
            showConfirmButton: false,
            timer: 3000,
        })
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center text-danger">Register a Candidate</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Candidate Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    value={form.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Party</label>
                                <input
                                    type="text"
                                    id="party"
                                    className="form-control"
                                    value={form.party}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-danger w-100">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Candidate List Table */}
            <div className="container mt-5">
                <h3 className="text-center text-danger">Registered Candidates</h3>
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Party</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.map((candidate) => (
                            <tr key={candidate.id}>
                                <td>{candidate.id}</td>
                                <td>{candidate.name}</td>
                                <td>{candidate.party}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => editCandidate(candidate.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteCandidate(candidate.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {candidates.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No candidates found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
