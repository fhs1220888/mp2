// src/pages/DetailPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPokemonByName, getPokemonList, officialArt } from "../api/api";
import type { Pokemon } from "../api/api";
import styles from "../styles/DetailPage.module.css";
import btn from "../styles/Button.module.css";

const DetailPage: React.FC = () => {
    const { name = "" } = useParams();
    const nav = useNavigate();

    // detail state
    const [p, setP] = useState<Pokemon | null>(null);
    const [err, setErr] = useState<string | null>(null);

    // list for prev/next (simple: by id order)
    const [namesById, setNamesById] = useState<{ id: number; name: string }[]>([]);

    // load current detail
    useEffect(() => {
        let cancelled = false;
        setErr(null);
        setP(null);
        (async () => {
            try {
                const res = await getPokemonByName(name);
                if (!cancelled) setP(res);
            } catch {
                if (!cancelled) setErr("Failed to load.");
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [name]);

    // prefetch a list to determine prev/next (200 is enough for demo)
    useEffect(() => {
        let cancelled = false;
        (async () => {
            const list = await getPokemonList(200, 0);
            if (!cancelled) {
                const sorted = [...list].sort((a, b) => a.id - b.id).map((x) => ({ id: x.id, name: x.name }));
                setNamesById(sorted);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    // compute prev/next by current index
    const prevNext = useMemo(() => {
        if (!p || !namesById.length) return { prev: null as string | null, next: null as string | null };
        const idx = namesById.findIndex((x) => x.name === p.name);
        const prev = idx > 0 ? namesById[idx - 1].name : null;
        const next = idx >= 0 && idx < namesById.length - 1 ? namesById[idx + 1].name : null;
        return { prev, next };
    }, [p, namesById]);

    if (err) return <div style={{ padding: 20 }}>{err}</div>;
    if (!p) return <div style={{ padding: 20 }}>Loading...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.navButtons}>
                <Link to="/list" className={`${btn.btn} ${btn.ghost}`}>
                    ← Back to List
                </Link>
                <Link to="/gallery" className={btn.btn}>
                    ← Back to Gallery
                </Link>
            </div>

            <div className={styles.layout}>
                {/* image */}
                <div>
                    <img alt={p.name} src={officialArt(p)} className={styles.img} />
                </div>

                {/* attributes */}
                <div>
                    <h2 className={styles.title}>#{p.id} {p.name}</h2>

                    <p className={styles.meta}>
                        <b>Types:</b> {p.types.map((t) => t.type.name).join(", ")}
                    </p>

                    <p className={styles.meta}>
                        <b>Height:</b> {p.height} &nbsp; <b>Weight:</b> {p.weight}
                    </p>

                    <p className={styles.meta}>
                        <b>Abilities:</b> {p.abilities.map((a) => a.ability.name).join(", ")}
                    </p>

                    <div className={styles.stats}>
                        <b>Stats:</b>
                        <ul>
                            {p.stats.map((s) => (
                                <li key={s.stat.name}>
                                    {s.stat.name}: {s.base_stat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* prev / next by id order */}
                    <div className={styles.nav}>
                        <button className={`${btn.btn} ${btn.ghost}`} disabled={!prevNext.prev}
                                onClick={() => prevNext.prev && nav(`/pokemon/${prevNext.prev}`)}>
                            ← Prev
                        </button>
                        <button className={btn.btn} disabled={!prevNext.next}
                                onClick={() => prevNext.next && nav(`/pokemon/${prevNext.next}`)}>
                            Next →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
