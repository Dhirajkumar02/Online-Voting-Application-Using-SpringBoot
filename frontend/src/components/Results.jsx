import { useState } from 'react'
import Swal from 'sweetalert2'

export default function Results() {
    const [electionName, setElectionName] = useState('')
    const [result, setResult] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:8082/api/election-result/declare', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ electionName }),
            })
            if (!res.ok) throw new Error('Result not found')

            const data = await res.json()
            setResult(data)
        } catch (error) {
            Swal.fire('Error', 'Election result not found.', 'error')
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center text-danger">Search Election Results</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Enter Election Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={electionName}
                                    onChange={(e) => setElectionName(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-danger w-100">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {result && (
                <div className="d-flex justify-content-center mt-4">
                    <div className="card text-center shadow-lg p-4" style={{ width: '400px' }}>
                        <h4 className="text-danger">{result.electionName}</h4>
                        <p><strong>Total Votes:</strong> {result.totalVotes}</p>
                        <p><strong>Winner ID:</strong> {result.winnerId}</p>
                        <p><strong>Votes Obtained:</strong> {result.winnerVotes}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
