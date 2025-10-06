// Choose sort key and direction
import React from "react";
import styles from "../styles/SortControls.module.css";

type SortKey = "id" | "name";
type SortDir = "asc" | "desc";

type Props = {
    sortBy: SortKey;
    setSortBy: (k: SortKey) => void;
    order: SortDir;
    setOrder: (d: SortDir) => void;
};

const SortControls: React.FC<Props> = ({ sortBy, setSortBy, order, setOrder }) => {
    return (
        <div className={styles.wrap}>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortKey)}>
                <option value="id">ID</option>
                <option value="name">Name</option>
            </select>
            <button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
                {order === "asc" ? "↑ Asc" : "↓ Desc"}
            </button>
        </div>
    );
};

export default SortControls;
