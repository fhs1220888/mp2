import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ListPage from "./pages/ListPage";
import GalleryPage from "./pages/GalleryPage";
import DetailPage from "./pages/DetailPage";
import './App.css';

function App() {
  return (
      <div className="App">
        <nav style={{ padding: 12, borderBottom: '1px solid #eee' }}>
          <Link to="/list" style={{ marginRight: 12 }}>List</Link>
          <Link to="/gallery">Gallery</Link>
        </nav>

          {/* router config */}
          <Routes>
              {/* default redirect */}
              <Route path="/" element={<Navigate to="/list" />} />
              {/* list view */}
              <Route path="/list" element={<ListPage />} />
              {/* gallery view */}
              <Route path="/gallery" element={<GalleryPage />} />
              {/* detail view with param */}
              <Route path="/pokemon/:name" element={<DetailPage />} />
              {/* 404 */}
              <Route path="*" element={<div style={{ padding: 20 }}>Not Found</div>} />
          </Routes>
      </div>
  );
}

export default App;

