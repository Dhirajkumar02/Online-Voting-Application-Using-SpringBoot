import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export default function Voting() {
    const [candidates, setCandidates] = useState([])
    const [votes, setVotes] = useState([])
    const [voterId, setVoterId] = useState('')
    const [candidateId, setCandidateId] = useState('')

    const loadCandidates = async () => {
        try {
            const res = await fetch('http://localhost:8082/api/candidate')
            const data = await res.json()
            setCandidates(data)
        } catch {
            showAlert('Error', 'Failed to load candidates.', 'error')
        }
    }

    const loadVotes = async () => {
        try {
            const res = await fetch('http://localhost:8082/api/votes')
            const data = await res.json()
            setVotes(data)
        } catch {
            showAlert('Error', 'Failed to load votes.', 'error')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!voterId || !candidateId) {
            return showAlert('Warning', 'Please enter Voter ID and select a candidate.', 'warning')
        }

        try {
            const response = await fetch('http://localhost:8082/api/votes/cast', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ voterId, candidateId }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.messageString || 'Something went wrong!')
            }

            const result = await response.json()
            showAlert('Success', result.message, 'success')
            setVoterId('')
            setCandidateId('')
            loadVotes()
        } catch (error) {
            showAlert('Error', error.message, 'error')
        }
    }

    const showAlert = (title, message, type = 'info') => {
        Swal.fire({
            title,
            text: message,
            icon: type,
            confirmButtonColor: '#d9534f',
        })
    }

    useEffect(() => {
        loadCandidates()
        loadVotes()
    }, [])

    return (
        <div className="container mt-5">
            <h2 className="text-center text-danger">Vote for a Candidate</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Your Voter ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={voterId}
                                    onChange={(e) => setVoterId(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Select Candidate</label>
                                <select
                                    className="form-select"
                                    value={candidateId}
                                    onChange={(e) => setCandidateId(e.target.value)}
                                    required
                                >
                                    <option value="">Select a Candidate</option>
                                    {candidates.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name} ({c.party})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-danger w-100">
                                Cast Vote
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <h3 className="text-center mt-5 text-danger">All Votes Cast</h3>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Voter ID</th>
                        <th>Candidate ID</th>
                    </tr>
                </thead>
                <tbody>
                    {votes.map((vote, idx) => (
                        <tr key={idx}>
                            <td>{vote.voterId}</td>
                            <td>{vote.candidateId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
