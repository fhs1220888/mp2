// src/pages/ListPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPokemonList } from "../api/api";
import SearchBar from "../components/SearchBar";
import SortControls from "../components/SortControls";

type Pokemon = { id: number; name: string; url: string };

const ListPage: React.FC = () => {
    // state
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<"id" | "name">("id");
    const [order, setOrder] = useState<"asc" | "desc">("asc");

    // load 200 entries
    useEffect(() => {
        getPokemonList(200, 0).then((res) => setPokemons(res));
    }, []);

    // filter + sort
    const filtered = useMemo(() => {
        let list = pokemons.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
        list.sort((a, b) => {
            if (sortBy === "id") return order === "asc" ? a.id - b.id : b.id - a.id;
            return order === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name);
        });
        return list;
    }, [pokemons, search, sortBy, order]);

    return (
        <div style={{ padding: 20 }}>
            <h2>Pokémon List</h2>

            {/* search + sort */}
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <SearchBar value={search} onChange={setSearch} placeholder="Search by name..." />
                <SortControls
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    order={order}
                    setOrder={setOrder}
                />
            </div>

            {/* results */}
            <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: 16 }}>
                {filtered.map((p) => (
                    <li key={p.id} style={{ padding: "6px 0", borderBottom: "1px solid #eee", textAlign: "left" }}>
                        {/* make each item clickable to detail route */}
                        <Link to={`/pokemon/${p.name}`} style={{ textDecoration: "none" }}>
                            #{p.id} — {p.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListPage;
