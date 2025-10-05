import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
      <div className="App">
        <nav style={{ padding: 12, borderBottom: '1px solid #eee' }}>
          <Link to="/list" style={{ marginRight: 12 }}>List</Link>
          <Link to="/gallery">Gallery</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/list" />} />
          <Route path="/list" element={<div>List Page (todo)</div>} />
          <Route path="/gallery" element={<div>Gallery Page (todo)</div>} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
  );
}

export default App;

