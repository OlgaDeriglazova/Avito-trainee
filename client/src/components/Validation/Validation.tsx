import * as yup from "yup";

const validationSchema = yup.object({

    // Общие поля
    name: yup.string()
        .min(3, "Минимум 3 символа")
        .required("Название обязательно"),
    description: yup.string()
        .min(10, "Минимум 10 символов")
        .required("Описание обязательно"),
    location: yup.string()
        .required("Введите местоположение"),
    type: yup.string()
        .oneOf(["Недвижимость", "Авто", "Услуги"], "Выберите корректный тип объявления")
        .required("Выбор типа объявления обязательно"),
    image: yup.string()
        .url("Некорректная ссылка на изображение")
        .nullable()
        .notRequired(),

    //Поля для недвижимости
    propertyType: yup.string().when("type", {
        is: "Недвижимость",
        then: schema => schema.required("Выбор типа недвижимости обязателен"),
        otherwise: schema => schema.notRequired()
    }),
    area: yup.number().when("type", {
        is: "Недвижимость",
        then: schema => schema
            .typeError("Площадь должна быть числом")
            .positive("Площадь должна быть положительным числом")
            .required("Площадь обязательна"),
        otherwise: schema => schema.nullable().notRequired()
    }),
    rooms: yup.number().when("type", {
        is: "Недвижимость",
        then: schema => schema
            .typeError("Количество комнат должно быть числом")
            .positive("Количество комнат должно быть положительным числом")
            .integer("Количество комнат должно быть целым числом")
            .required("Количество комнат обязательно"),
        otherwise: schema => schema.nullable().notRequired()
    }),
    price: yup.number().when("type", {
        is: "Недвижимость",
        then: schema => schema
            .typeError("Цена должна быть числом")
            .positive("Цена должна быть положительным числом")
            .required("Цена обязательна"),
        otherwise: schema => schema.nullable().notRequired()
    }),

    //Поля для авто
    brand: yup.string().when("type", {
        is: "Авто",
        then: schema => schema
            .required("Выбор марки обязателен"),
        otherwise: schema => schema.nullable().notRequired()
    }),
    model: yup.string().when("type", {
        is: "Авто",
        then: schema => schema 
            .min(3, "Минимум 3 символа")
            .required("Модель обязательна"),
        otherwise: schema => schema.nullable().notRequired(),
    }),
    year: yup.number().when("type", {
        is: "Авто",
        then: schema => schema
            .typeError("Год должен быть числом")
            .integer("Год должен быть целым числом")
            .min(1885,"Год не может быть раньше 1885 года")
            .max(new Date().getFullYear(), "Год не может быть в будущем")
            .required("Год выпуска обязателен"),
        otherwise: schema => schema.nullable().notRequired(),
    }),
    mileage: yup.number()
        .typeError("Пробег должен быть числом")
        .integer("Пробег должен быть целым числом")
        .min(0, "Пробег не может быть отрицательным")
        .nullable()
        .notRequired(),

    // поля для услуг
    serviceType: yup.string().when("type", {
        is: "Услуги",
        then: schema => schema 
            .min(3, "Минимум 3 символа")
            .required("Тип услуги обязателен"),
        otherwise: schema => schema.nullable().notRequired()
    }),
    experience: yup.number().when("type", {
        is: "Услуги",
        then: schema => schema
            .typeError("Опыт работы должен быть числом")
            .integer("Опыт работы должен быть целым числом")
            .min(0, "Опыт не может быть отрицательным")
            .required("Опыт работы обязателен"),
        otherwise: schema => schema.nullable().notRequired(),
    }), 
    cost: yup.number().when("type", {
        is: "Услуги",
        then: schema => schema
            .typeError("Стоимость должна быть числом")
            .positive("Стоимость должна быть положительной")
            .required("Стоимость услуги обязательна"),
        otherwise: schema => schema.nullable().notRequired(),
    }),
    workSchedule: yup.string().when("type", {
        is: "Услуги",
        then: schema => schema
            .matches(/^[а-яА-Яa-zA-Z0-9\s:-]+$/, "График работы может содержать только буквы, цифры, пробелы и символы `: -`")
            .nullable()
            .notRequired(),
    })
});

export default validationSchema;
