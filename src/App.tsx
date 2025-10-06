import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import ListPage from "./pages/ListPage";
import GalleryPage from "./pages/GalleryPage";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import './App.css';
import pokeball from "./assets/pokeball.svg";
import styles from "./styles/AppNav.module.css";
import { Link } from "react-router-dom"

function App() {
  return (
      <div className="App">
          {/* nav bar */}
          <div className={styles.wrap}>
              <div className={styles.inner}>
                  <Link to="/" className={styles.brand}>
                      <img src={pokeball} alt="Pokéball" className={styles.logo} />
                      Pokédex
                  </Link>
                  <NavLink to="/list" className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}>List</NavLink>
                  <NavLink to="/gallery" className={({isActive}) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Gallery</NavLink>
                  <div className={styles.spacer} />
              </div>
          </div>

          {/* router config */}
          <div className="container">
            <Routes>
              {/* default redirect */}
              <Route path="/" element={<HomePage />} />
              <Route path="/mp2" element={<HomePage />} />
              <Route path="/mp2/*" element={<Navigate to="/" replace />} />
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
      </div>
  );
}

export default App;

