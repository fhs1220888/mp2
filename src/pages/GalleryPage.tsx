// src/pages/GalleryPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPokemonList, getPokemonByName, getAllTypes, officialArt } from "../api/api";
import type { Pokemon } from "../api/api";

const GalleryPage: React.FC = () => {
    // data state
    const [items, setItems] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);
    const [types, setTypes] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    // load types and a sample of pokemon
    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            try {
                const [list, t] = await Promise.all([getPokemonList(60, 0), getAllTypes()]);
                const detailed = await Promise.all(list.map((p) => getPokemonByName(p.name)));
                if (!cancelled) {
                    setItems(detailed);
                    setTypes(t);
                }
            } finally {
                setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    // filter by selected types
    const visible = useMemo(() => {
        if (!selected.length) return items;
        return items.filter((p) => {
            const ts = p.types.map((t) => t.type.name);
            return selected.every((s) => ts.includes(s));
        });
    }, [items, selected]);

    // toggle a type
    const toggle = (t: string) => {
        setSelected((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Gallery</h2>

            {/* filters */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {types.map((t) => (
                    <label key={t} style={{ border: "1px solid #eee", padding: "4px 8px", borderRadius: 8 }}>
                        <input type="checkbox" checked={selected.includes(t)} onChange={() => toggle(t)} /> {t}
                    </label>
                ))}
            </div>

            {loading && <div style={{ marginTop: 12 }}>Loading...</div>}

            {/* grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                    gap: 16,
                    marginTop: 16,
                }}
            >
                {visible.map((p) => (
                    <Link
                        key={p.name}
                        to={`/pokemon/${p.name}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <div
                            style={{
                                border: "1px solid #eee",
                                borderRadius: 12,
                                padding: 10,
                                textAlign: "center",
                            }}
                        >
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
                ))}
            </div>
        </div>
    );
};

export default GalleryPage;
