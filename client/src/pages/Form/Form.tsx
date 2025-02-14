import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import validationSchema from "../../components/Validation/Validation"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver } from "react-hook-form";
import { Item } from "../../components/types/types";
import * as yup from "yup";
import { API_URL } from "../../constants/api";
import Button_return from "../../components/ButtonReturn/Button_return";
import styles from "./Form.module.scss";

const Form: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = Boolean(location.state?.item);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
} = useForm<Item>({
    resolver: yupResolver(validationSchema) as Resolver<Item>, // Приведение типов
});

  const selectedType = watch("type");

// Заполнение данных при редактировании
  useEffect(() => {
        if(location.state?.item) {
            Object.keys(location.state.item).forEach((key) => {
                setValue(key as keyof Item, location.state.item[key]);
            })
        }
  }, [location.state, setValue])

  // Отправка данных на сервер
  const onSubmit = async (data: Item) => {
    try {
        if (isEditing) {
            await axios.put(`${API_URL}/${location.state.item.id}`, data)
        } else {
            await axios.post(API_URL, data);
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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <label htmlFor="name">Название объявления</label>
            <input 
                id="name"
                type="text"
                name="name"
                {...register("name")}
            />
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}

            <label htmlFor="description">Описание объявления</label>
            <textarea
                id="description"
                name="description"
                {...register("description")}
            />
            {errors.description && <p className={styles.error}>{errors.description.message}</p>}

            <label htmlFor="location">Местоположение</label>
            <input 
                id="location"
                type="text" 
                name="location" 
                placeholder="Введите адрес" 
                {...register("location")}
            />
            {errors.location && <p className={styles.error}>{errors.location.message}</p>}

             <label htmlFor="image">Фотография</label>
            <input
                id="image"
                type="string"
                name="image"
                {...register("image")}
            />
            {errors.image && <p className={styles.error}>{errors.image.message}</p>}
             <label htmlFor='type'>Категория</label>
            <select 
                id="type"
                name="type"
                {...register("type")}
            >
                <option value="" disabled selected hidden>Выберите категорию</option>
                <option value="Недвижимость">Недвижимость</option>
                <option value="Авто">Авто</option>
                <option value="Услуги">Услуги</option>
            </select>
            {errors.type && <p className={styles.error}>{errors.type.message}</p>}

            {/* Поля для Недвижимости */}
            {selectedType === "Недвижимость" && (
            <>
            <label htmlFor="propertyType">Тип недвижимости</label>
                <select 
                    id="propertyType"
                    name="propertyType" 
                    {...register("propertyType")}
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
                {errors.propertyType && <p className={styles.error}>{errors.propertyType.message}</p>}
            <label htmlFor="area">Площадь</label>
                <input 
                    id="area"
                    type="number" 
                    name="area" 
                    placeholder="кв.м" 
                    {...register("area")}
                />
                {errors.area && <p className={styles.error}>{errors.area.message}</p>}
            <label htmlFor="rooms">Количество комнат</label>
                <input 
                    id="rooms"
                    type="number" 
                    name="rooms" 
                    {...register("rooms")}
                />
                {errors.rooms && <p className={styles.error}>{errors.rooms.message}</p>}
            <label htmlFor="price">Цена</label>
                <input 
                    id="price"
                    type="number" 
                    name="price" 
                    placeholder="руб" 
                    {...register("price")}
                />
                {errors.price && <p className={styles.error}>{errors.price.message}</p>}
            </>
            )}

            {/* Поля для Авто */}
            {selectedType === "Авто" && (
            <>
            <label htmlFor="brand">Марка</label>
                <select
                    id="brand"
                    name="brand" 
                    {...register("brand")} 
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
                {errors.brand && <p className={styles.error}>{errors.brand.message}</p>}
            <label htmlFor="model">Модель</label>
                <input 
                    id="model"
                    type="text" 
                    name="model" 
                    {...register("model")}
                />
                {errors.model && <p className={styles.error}>{errors.model.message}</p>}
            <label htmlFor="year">Год выпуска</label>
                <input 
                    id="year"
                    type="number" 
                    name="year" 
                    {...register("year")}
                />
                {errors.year && <p>{errors.year.message}</p>}
                <label htmlFor="mileage">Пробег</label>
                <input 
                    id="mileage"
                    type="number" 
                    name="mileage" 
                    placeholder="км" 
                    {...register("mileage")}
                />
                {errors.mileage && <p className={styles.error}>{errors.mileage.message}</p>}
            </>
            )}

            {/* Поля для Услуг */}
            {selectedType === "Услуги" && (
            <>
              <label htmlFor="serviceType">Тип услуги</label>
                <input 
                    id="serviceType"
                    type="text" 
                    name="serviceType" 
                    {...register("serviceType")}
                />
                {errors.serviceType && <p className={styles.error}>{errors.serviceType.message}</p>}
                <label htmlFor="experience">Опыт</label>
                <input 
                    id="experience"
                    type="number" 
                    name="experience" 
                    placeholder="Количество лет" 
                    {...register("experience")}
                />
                {errors.experience && <p className={styles.error}>{errors.experience.message}</p>}
                <label htmlFor="cost">Стоимость</label>
                <input 
                    id="cost"
                    type="number" 
                    name="cost" 
                    placeholder="руб" 
                    {...register("cost")} 
                />
                {errors.cost && <p>{errors.cost.message}</p>}
                <label htmlFor="workSchedule">График работы</label>
                <input 
                    type="text" 
                    name="workSchedule" 
                    {...register("workSchedule")}
                />
                {errors.workSchedule && <p className={styles.error}>{errors.workSchedule.message}</p>}
            </>
            )}

        <button type="submit" className={styles.button_submit}>{isEditing ? "Обновить" : "Создать"}</button>
      </form>
    </div>
  );
};

export default Form;
