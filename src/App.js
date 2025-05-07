import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import your page components
import Loans from './pages/Loans';
import Investing from './pages/Investing';
import HomeFinance from './pages/HomeFinance';

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">RubensCalculator</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Loans</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/investing">Investing</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/home-finance">Home Finance</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Loans />} />
          <Route path="/investing" element={<Investing />} />
          <Route path="/home-finance" element={<HomeFinance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;