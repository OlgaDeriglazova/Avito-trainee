import React, { useState } from "react";
import styles from './SearchBar.module.scss';
import CloseIcon from "../../assets/close.svg";

interface Item {
    id: number;
    name: string;
    image?: string;
    location: string;
    type: "Недвижимость" | "Авто" | "Услуги";
}

interface SearchBarProps {
    items: Item[]; 
    onSearchItem: (item: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ items, onSearchItem }) => {
    const [searchItem, setSearchItem] = useState("");
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const item = e.target.value;
        setSearchItem(item);
        onSearchItem(item);
    }

    const handleResetSearch = () => {
        setSearchItem("");
        onSearchItem("");
    }

    return (
        <div className={styles.container}>
            <input 
                type="text"
                value={searchItem}
                className={styles.search_input}
                placeholder="Введите название..."
                onChange={handleSearchChange}
            />
            {searchItem.length > 0 && (
                <button 
                    className={styles.close}
                    onClick={handleResetSearch}
                >
                    <img src={CloseIcon} alt="return" />
                </button>
            )}
        </div>
    )
}

export default SearchBar;