import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants/api.js';
import SearchBar from '../../components/Search_bar/Search_bar';
import styles from './ListAds.module.scss';

interface Item {
    id: number;
    name: string;
    location: string;
    type: "Недвижимость" | "Авто" | "Услуги";
    image?: string; 
}

const ListAds: React.FC = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<Item[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => {
                console.log('Данные с сервера:', data);
                setItems(data)})
            .catch((error) => console.error(error))
    }, [])

    //пагинация
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem =  indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

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
            <ul className={styles.items_container}> 
                {currentItems.map((item) => (
                    <li key={item.id} className={styles.item}>
                        <img src={item.image || "https://www.laser-bulat.ru/upload/medialibrary/735/2lj6sel8ygv8p6j2xj85gplt9ufd5xpn.png" } alt='Фото' className={styles.item_photo} />
                        <div className={styles.item_text}>
                            <h2>{item.name}</h2>
                            <p>{item.location}</p>
                            <p>{item.type}</p>

                        </div>
                        <button className={styles.button_open} onClick={() => navigate(`/items/${item.id}`, { state: { item } })}>Открыть</button>
                    </li>
                ))}
            </ul>
            <div className={styles.pagination}>
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}>
                    Назад
                </button>
                <span>Page {currentPage} of {totalPages} </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}>
                    Вперед
                </button>
            </div>
        </div>
    )
}
export default ListAds;