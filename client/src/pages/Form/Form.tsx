import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../../constants/api";
import Button_return from "../../components/ButtonReturn/Button_return";
import styles from "./Form.module.scss";

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

const Form: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = Boolean(location.state?.item);

  const [form, setForm] = useState<Item>({
    name: "",
    description: "",
    location: "",
    type: "Недвижимость",
  });

  useEffect(() => {
    if (location.state?.item) {
        setForm(location.state.item);
    }
  }, [location.state])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Преобразование числовые значения
    const newValue = ["area", "rooms", "price", "year", "mileage", "experience", "cost"].includes(name)
      ? Number(value)
      : value;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));
  };

//   // Загрузка фотографии объявления
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files[0];
//     setFile(file);
//   };

  // Отправка данных на сервер
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        if (isEditing) {
            await axios.put(`${API_URL}/${location.state.item.id}`, form)
        } else {
            await axios.post(API_URL, form);
        }
      navigate("/list");
    } catch (error) {
      alert("Ошибка при создании объявления");
    }
  };



  return (
    <div className={styles.container}>
        <div className={styles.container_title}>
            <Button_return />
            <h1>{isEditing ? "Редактирование объявления" : "Новое объявление"}</h1>
        </div>
      <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="name">Название объявления</label>
            <input 
                id="name"
                type="text"
                name="name"
                value={form.name} 
                onChange={handleChange}
                required 
            />
            <label htmlFor="description">Описание объявления</label>
            <textarea
                id="description"
                name="description"
                value={form.description} 
                onChange={handleChange} 
                required 
            />
            <label htmlFor="location">Местоположение</label>
            <input 
                id="location"
                type="text" 
                name="location" 
                placeholder="Введите адрес" 
                value={form.location} 
                onChange={handleChange} 
                required 
            />
             <label htmlFor="image">Фотография</label>
            <input
                id="image"
                type="string"
                name="image"
                value={form.image} 
                onChange={handleChange}
            />
             <label htmlFor='type'>Выберите категорию</label>
            <select 
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
            >
                <option value="Недвижимость">Недвижимость</option>
                <option value="Авто">Авто</option>
                <option value="Услуги">Услуги</option>
            </select>
            {/* Поля для Недвижимости */}
            {form.type === "Недвижимость" && (
            <>
            <label htmlFor="propertyType">Тип недвижимости</label>
                <select 
                    id="propertyType"
                    name="propertyType" 
                    value={form.propertyType} 
                    onChange={handleChange} 
                    required
                >
                    <option value="" disabled selected hidden>Выберите тип</option>
                    <option value="Квартира">Квартира</option>
                    <option value="Дом">Дом</option>
                    <option value="Коттедж">Коттедж</option>
                    <option value="Комната">Комната</option>
                    <option value="Земельный участок">Земельный участок</option>
                    <option value="Гараж">Гараж</option>
                    <option value="Коммерческая недвижимость">Коммерческая недвижимость</option>
                </select>
            <label htmlFor="area">Площадь</label>
                <input 
                    id="area"
                    type="number" 
                    name="area" 
                    placeholder="кв.м" 
                    value={form.area} 
                    onChange={handleChange} 
                    required />
            <label htmlFor="rooms">Количество комнат</label>
                <input 
                    id="rooms"
                    type="number" 
                    name="rooms" 
                    value={form.rooms} 
                    onChange={handleChange} 
                    required />
            <label htmlFor="price">Цена</label>
                <input 
                    id="price"
                    type="number" 
                    name="price" 
                    placeholder="руб" 
                    value={form.price} 
                    onChange={handleChange} 
                    required 
                />
            </>
            )}

            {/* Поля для Авто */}
            {form.type === "Авто" && (
            <>
            <label htmlFor="brand">Марка</label>
                <select
                    id="brand"
                    name="brand" 
                    value={form.brand} 
                    onChange={handleChange} 
                    required 
                >
                    <option value="" disabled selected hidden>Выберите марку</option>
                    <option value="Audi">Audi</option>
                    <option value="BMW">BMW</option>
                    <option value="Changan">Changan</option>
                    <option value="Chery">Chery</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Daewo">Daewo</option>
                    <option value="Ford">Ford</option>
                </select>
            <label htmlFor="model">Модель</label>
                <input 
                    id="model"
                    type="text" 
                    name="model" 
                    value={form.model} 
                    onChange={handleChange} 
                    required 
                />
            <label htmlFor="year">Год выпуска</label>
                <input 
                    id="year"
                    type="number" 
                    name="year" 
                    value={form.year} 
                    onChange={handleChange} 
                    required 
                />
                <label htmlFor="mileage">Пробег</label>
                <input 
                    id="mileage"
                    type="number" 
                    name="mileage" 
                    placeholder="км" 
                    value={form.mileage || ""} 
                    onChange={handleChange} 
                />
            </>
            )}

            {/* Поля для Услуг */}
            {form.type === "Услуги" && (
            <>
              <label htmlFor="serviceType">Тип услуги</label>
                <input 
                    id="serviceType"
                    type="text" 
                    name="serviceType" 
                    value={form.serviceType} 
                    onChange={handleChange} 
                    required 
                />
                <label htmlFor="experience">Опыт</label>
                <input 
                    id="experience"
                    type="number" 
                    name="experience" 
                    placeholder="Количество лет" 
                    value={form.experience} 
                    onChange={handleChange} 
                    required 
                />
                <label htmlFor="cost">Стоимость</label>
                <input 
                    id="cost"
                    type="number" 
                    name="cost" 
                    placeholder="руб" 
                    value={form.cost} 
                    onChange={handleChange} 
                    required 
                />
                <label htmlFor="workSchedule">График работы</label>
                <input 
                    type="text" 
                    name="workSchedule" 
                    value={form.workSchedule || ""} 
                    onChange={handleChange} 
                />
            </>
            )}

        <button type="submit" className={styles.button_submit}>{isEditing ? "Обновить" : "Создать"}</button>
      </form>
    </div>
  );
};

export default Form;
