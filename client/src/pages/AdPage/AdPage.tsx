import React, {  useEffect, useState }  from "react";
import ButtonReturn from "../../components/ButtonReturn/ButtonReturn";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from '../../constants/api.js';
import styles from "./AdPage.module.scss";

interface Item {
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

const AdPage = () => {
    const { id } = useParams<{ id: string}>();
    const location = useLocation()
    const [item, setItem] = useState<Item | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(location.state.item) {
            setItem(location.state.item);
        } else {
            fetch(`${API_URL}/${id}`)
            .then((res) => res.json())
            .then((data) => setItem(data))
            .catch((error) => console.error(error));
        }
    }, [id, location.state])

    if (!item) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className={styles.container}>
            <ButtonReturn />
            <div className={styles.item}>
                <img src={item.image || "https://www.laser-bulat.ru/upload/medialibrary/735/2lj6sel8ygv8p6j2xj85gplt9ufd5xpn.png" } alt='Фото' className={styles.item_photo} />
                    <div className={styles.item_text}>
                        <h2>{item.name}</h2>
                        <p>Местоположение: {item.location}</p>
                        <p>Тип: {item.type}</p>
                        <p>Описание: {item.description}</p>
                        {item.type === "Недвижимость" && (
                            <>
                                <p>Тип недвижимости: {item.propertyType}</p>
                                <p>Площадь: {item.area}</p>
                                <p>Количество комнат: {item.rooms}</p>
                                <p>Цена: {item.price}</p>
                            </>
                        )}
                        {item.type === "Авто" && (
                            <>
                            <p>Марка: {item.brand}</p>
                            <p>Модель: {item.model}</p>
                            <p>Год выпуска: {item.year}</p>
                            <p>Пробег: {item.mileage}</p>
                            </> 
                        )}
                        {item.type === "Услуги" && (
                            <>
                             <p>Тип: {item.serviceType}</p>
                             <p>Опыт работы: {item.experience}</p>
                             <p>Цена: {item.cost}</p>
                             <p>График работы: {item.workSchedule}</p>
                            </>
                        )}
                    
                    </div>
            </div>
            <button
                onClick={() => navigate("/form", { state: { item } })}
                className={styles.button_edit}
            >
                Редактировать
            </button>
        </div>
    )
}

export default AdPage;