import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Ads.module.scss";

interface Item {
    id: number;
    name: string;
    location: string;
    type: "Недвижимость" | "Авто" | "Услуги";
    image?: string; 
}
interface AdsProps {
    item: Item;
}

const Ads: React.FC<AdsProps> = ({ item }) => {
    const navigate = useNavigate();
    return (
        <li key={item.id} className={styles.item}>
            <img src={item.image || "https://www.laser-bulat.ru/upload/medialibrary/735/2lj6sel8ygv8p6j2xj85gplt9ufd5xpn.png" } alt='Фото' className={styles.item_photo} />
            <div className={styles.item_text}>
                <h2>{item.name}</h2>
                <p>{item.location}</p>
                <p>{item.type}</p>
            </div>
            <button className={styles.button_open} onClick={() => navigate(`/items/${item.id}`, { state: { item } })}>Открыть</button>
        </li>
    )
}

export default Ads;