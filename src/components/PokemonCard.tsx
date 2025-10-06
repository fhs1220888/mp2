// Card with image + name
import React from "react";
import { Link } from "react-router-dom";
import type { Pokemon } from "../api/api";
import { officialArt } from "../api/api";
import styles from "../styles/PokemonCard.module.css";

type Props = { p: Pokemon };

// map type name to css class
const tClass = (t: string) => {
    const key = t.toLowerCase();
    return styles[`t-${key}`] || styles["t-normal"];
};
const PokemonCard: React.FC<Props> = ({ p }) => {
    return (
        <Link to={`/pokemon/${p.name}`} className={styles.link}>
            <div className={styles.card}>
                <img alt={p.name} src={officialArt(p)} className={styles.img} />
                <div className={styles.title}>#{p.id} {p.name}</div>
                <div className={styles.chips}>
                    {p.types.map((t) => (
                        <span key={t.type.name} className={`${styles.chip} ${tClass(t.type.name)}`}>
              {t.type.name}
            </span>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default PokemonCard;
