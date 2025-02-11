import React, { useState } from "react";
import styles from "./Search_bar.module.scss";
import { Link } from "react-router-dom";

interface Item {
    id: string;
    name: string;
    description: string;
    location: string;
    type: "Недвижимость" | "Авто" | "Услуги";
    image?: string;
    propertyType?: string;
    area?: number;
    rooms?: number;
    price?: number;
    brand?: string;
    model?: string;
    year?: number;
    mileage?: number;
    serviceType?: string;
    experience?: number;
    cost?: number;
    workSchedule?: string;
}

interface SearchBarProps {
    items: Item[];
    onSelect: (item: Item) => void;
 }

const SearchBar:React.FC<SearchBarProps> = ({ items, onSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Поиск по названию"
                className={styles.searchInput}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredItems.map((item) =>
                <li key={item.id} onClick={() => onSelect(item)}>
                    {item.name}
                </li>
                )}
            </ul>
        </div>
    )
}

export default SearchBar;