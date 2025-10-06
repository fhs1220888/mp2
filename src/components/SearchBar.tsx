// Simple controlled input
import React from "react";

type Props = {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
};

const SearchBar: React.FC<Props> = ({ value, onChange, placeholder }) => {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Search..."}
            style={{ padding: 8 }}
        />
    );
};

export default SearchBar;
