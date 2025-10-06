// Simple controlled input
import React from "react";
import styles from "../styles/SearchBar.module.css";

type Props = {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
};

const SearchBar: React.FC<Props> = ({ value, onChange, placeholder }) => {
    return (
        <input
            className={styles.input}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Search..."}
        />
    );
};

export default SearchBar;
