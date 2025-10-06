// Card with image + name
import React from "react";
import { Link } from "react-router-dom";
import type { Pokemon } from "../api/api";
import { officialArt } from "../api/api";

type Props = { p: Pokemon };

const PokemonCard: React.FC<Props> = ({ p }) => {
    return (
        <Link to={`/pokemon/${p.name}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 10, textAlign: "center" }}>
                <img
                    alt={p.name}
                    src={officialArt(p)}
                    style={{ width: 120, height: 120, objectFit: "contain" }}
                />
                <div style={{ marginTop: 6, fontWeight: 600 }}>
                    #{p.id} {p.name}
                </div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>
                    {p.types.map((t) => t.type.name).join(", ")}
                </div>
            </div>
        </Link>
    );
};

export default PokemonCard;
