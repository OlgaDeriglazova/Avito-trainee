import React from "react";
import styles from "./CategoryFilter.module.scss";

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}
const CategoryFilter: React.FC<CategoryFilterProps> = ( {categories, selectedCategory, onSelectCategory } ) => {

return (
    <div className={styles.container}>
        <select 
            name="filter" 
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value)}
        >
            <option value="">Все категории</option>
            {categories.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}

        </select>
    </div>
)
}

export default CategoryFilter;