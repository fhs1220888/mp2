// src/api/api.ts
import axios from "axios";

export type PokemonListItem = { name: string; url: string; id: number };
export type PokemonType = { slot: number; type: { name: string; url: string } };
export type PokemonSprite = {
    front_default: string | null;
    other?: { [k: string]: { front_default?: string } };
};
export type Pokemon = {
    id: number;
    name: string;
    types: PokemonType[];
    sprites: PokemonSprite;
    height: number;
    weight: number;
    abilities: { ability: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
};

// Axios instance
const api = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    timeout: 12000,
});

// Simple cache (memory + localStorage)
const mem = new Map<string, any>();
const getLS = (k: string) => {
    try {
        return JSON.parse(localStorage.getItem(k) || "null");
    } catch {
        return null;
    }
};
const setLS = (k: string, v: any) => {
    try {
        localStorage.setItem(k, JSON.stringify(v));
    } catch {}
};

// Fetch with cache
async function cachedGet<T>(key: string, url: string): Promise<T> {
    if (mem.has(key)) return mem.get(key);
    const cached = getLS(key);
    if (cached) {
        mem.set(key, cached);
        return cached;
    }
    const res = await api.get<T>(url);
    mem.set(key, res.data);
    setLS(key, res.data);
    return res.data;
}

// Get Pokémon list (default 200)
export async function getPokemonList(
    limit = 200,
    offset = 0
): Promise<PokemonListItem[]> {
    const data = await cachedGet<{ results: { name: string; url: string }[] }>(
        `list_${limit}_${offset}`,
        `/pokemon?limit=${limit}&offset=${offset}`
    );
    return data.results.map((r) => {
        const m = r.url.match(/\/pokemon\/(\d+)\/?$/);
        return { name: r.name, url: r.url, id: m ? Number(m[1]) : 0 };
    });
}

// Get Pokémon detail
export async function getPokemonByName(name: string): Promise<Pokemon> {
    return cachedGet<Pokemon>(`poke_${name}`, `/pokemon/${name}`);
}

// Get all types
export async function getAllTypes(): Promise<string[]> {
    const data = await cachedGet<{ results: { name: string }[] }>(
        "types_all",
        "/type"
    );
    return data.results
        .map((t) => t.name)
        .filter((t) => !["unknown", "shadow"].includes(t));
}

// Get official artwork
export function officialArt(p: Pokemon): string {
    return (
        p.sprites.other?.["official-artwork"]?.front_default ||
        p.sprites.front_default ||
        ""
    );
}
