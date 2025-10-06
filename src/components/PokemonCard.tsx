// Card with image + name
import React from "react";
import { Link } from "react-router-dom";
import type { Pokemon } from "../api/api";
import { officialArt } from "../api/api";
import styles from "../styles/PokemonCard.module.css";

type Props = { p: Pokemon };

const PokemonCard: React.FC<Props> = ({ p }) => {
    return (
        <Link to={`/pokemon/${p.name}`} className={styles.link}>
            <div className={styles.card}>
                <img alt={p.name} src={officialArt(p)} className={styles.img} />
                <div className={styles.title}>
                    #{p.id} {p.name}
                </div>
                <div className={styles.meta}>{p.types.map((t) => t.type.name).join(", ")}</div>
            </div>
        </Link>
    );
};

export default PokemonCard;
