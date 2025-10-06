// src/pages/HomePage.tsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/HomePage.module.css";

const HomePage: React.FC = () => {
    return (
        <div className={styles.hero}>
            <div className={styles.inner}>
                <h1 className={styles.title}>Pokédex Explorer</h1>
                <p className={styles.subtitle}>
                    Discover Pokémon. Search, browse, and explore them all!
                </p>
                <div className={styles.buttons}>
                    <Link to="/list" className={styles.btnPrimary}>Go to List</Link>
                    <Link to="/gallery" className={styles.btnSecondary}>Go to Gallery</Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
