# Образ Node.js
FROM node:16

# Рабочая директория
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json
COPY server/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY server/ .

# Порт для сервера
EXPOSE 3000

# Команда для запуска сервера
CMD ["npm", "start"]
