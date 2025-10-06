// Multi-select checkboxes
import React from "react";

type Props = {
    all: string[];
    selected: string[];
    onChange: (next: string[]) => void;
};

const TypeFilters: React.FC<Props> = ({ all, selected, onChange }) => {
    const toggle = (t: string) => {
        onChange(selected.includes(t) ? selected.filter((x) => x !== t) : [...selected, t]);
    };

    return (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {all.map((t) => (
                <label key={t} style={{ border: "1px solid #eee", padding: "4px 8px", borderRadius: 8 }}>
                    <input type="checkbox" checked={selected.includes(t)} onChange={() => toggle(t)} /> {t}
                </label>
            ))}
        </div>
    );
};

export default TypeFilters;
