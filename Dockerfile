# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# 🌟 CORREÇÃO: Removemos os ARGs manuais. 
# O Vite vai ler diretamente as variáveis VITE_ do painel da Railway durante o comando de build abaixo.
RUN npm run build

# Stage 2: Web Server (Nginx)
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
