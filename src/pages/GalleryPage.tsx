// src/pages/GalleryPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { getPokemonList, getPokemonByName, getAllTypes } from "../api/api";
import type { Pokemon } from "../api/api";
import PokemonCard from "../components/PokemonCard";
import TypeFilters from "../components/TypeFilters";
import Skeleton from "../components/Skeleton";
import styles from "../styles/GalleryPage.module.css";

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
                const [list, t] = await Promise.all([getPokemonList(150, 0), getAllTypes()]);
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

    return (
        <div className={styles.container}>
            <div className={styles.header}><h2>Gallery</h2></div>

            <div className={styles.filters}>
                <TypeFilters all={types} selected={selected} onChange={setSelected} />
            </div>

            {loading && (
                <div className={styles.grid}>
                    {Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} />)}
                </div>
            )}

            {!loading && (
                <>
                    <div className={styles.grid}>
                        {visible.map((p) => <PokemonCard key={p.name} p={p} />)}
                    </div>
                    {visible.length === 0 && <div className={styles.empty}>No results</div>}
                </>
            )}
        </div>
    );
};

export default GalleryPage;
