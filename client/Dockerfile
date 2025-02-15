# Образ Node.js
FROM node:20 as build

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json
COPY client/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY client/ .

# Строим клиентское приложение
RUN npm run build

# Задаем сервер
FROM nginx:alpine


# Копируем файлы сборки из предыдущего контейнера
COPY --from=build /app/build /usr/share/nginx/html
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт для Nginx
EXPOSE 80

# Стартуем Nginx
CMD ["nginx", "-g", "daemon off;"]
