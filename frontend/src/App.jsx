import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Candidates from "./components/Candidates";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Results from "./components/Results";
import Voters from "./components/Voters";
import Voting from "./components/Voting";

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="py-4">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/voters" element={<Voters />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/voting" element={<Voting />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}
