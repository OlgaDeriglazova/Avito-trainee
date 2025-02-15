import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../../constants/api.js';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter"
import Ads from '../../components/Ads/Ads';
import styles from './ListAds.module.scss';

interface Item {
    id: number;
    name: string;
    location: string;
    type: "Недвижимость" | "Авто" | "Услуги";
    image?: string; 
}

interface ListAdsProps {
    items?: Item[];
}

const ListAds: React.FC<ListAdsProps> = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<Item[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [searchItem, setSearchItem] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Загрузка данных с сервера
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        fetch(API_URL, { signal })
            .then((res) => res.json())
            .then((data) => {
                setItems(data)})
            .catch((error) => {
                if (error.name === "AbortError") {
                } else {
                 console.error("Ошибка загрузки:", error);
                }
            });
            
        return () => {
            controller.abort();
        };
    }, []);

    // Фильтрация по категории
    const filteredItems = selectedCategory
        ? items.filter((item) => item.type === selectedCategory) 
        : items;
    
     // Поиск по названию
    const searchedAds = searchItem
        ? filteredItems.filter((item) => item.name.toLowerCase().includes(searchItem.toLowerCase()))
        : filteredItems;

    // Пагинация
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem =  indexOfLastItem - itemsPerPage;
    const currentItems = searchedAds.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.max(1, Math.ceil(searchedAds.length / itemsPerPage));
   
    // Сброс currentPage при смене категории
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchItem]);

    // Управление страницами
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
        
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Список объявлений</h1>
            <button onClick={() => navigate('/form')} className={styles.button_create}>Разместить объявление</button>
            <div className={styles.search_container}>
                <CategoryFilter
                    categories={["Недвижимость", "Авто", "Услуги"]}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
                <SearchBar 
                    items={filteredItems} 
                    onSearchItem={setSearchItem}

                />
            </div>
            {currentItems.length > 0 ? (
                <>
                    <ul className={styles.items_container}> 
                        {currentItems.map((item) => (
                            <Ads key={item.id} item={item} />
                        ))}
                    </ul>
                    <div className={styles.pagination}>
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={styles.button_pagination}
                        >
                                Назад
                        </button>
                        <span> Страница {currentPage} из {totalPages} </span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={styles.button_pagination}
                        >
                                Вперед
                        </button>
                    </div>
                </>
            ) : (
                <p className={styles.adNotFound}>Объявления не найдены</p>
            )}
        </div>
    )
}
export default ListAds;