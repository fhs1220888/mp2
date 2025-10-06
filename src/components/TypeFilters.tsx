// Multi-select checkboxes
import React from "react";
import styles from "../styles/TypeFilters.module.css";

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
        <div className={styles.wrap}>
            {all.map((t) => (
                <label key={t} className={styles.badge}>
                    <input type="checkbox" checked={selected.includes(t)} onChange={() => toggle(t)} /> {t}
                </label>
            ))}
        </div>
    );
};

export default TypeFilters;
