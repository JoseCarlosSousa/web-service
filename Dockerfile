# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# 🌟 A PONTE: Diz ao Docker para capturar as variáveis correspondentes da Railway
ARG VITE_API_URL
ARG VITE_CUSTOMER_API_URL

# 🌟 CRIAÇÃO DO FICHEIRO: Escreve fisicamente as URLs no .env de produção
RUN echo "VITE_API_URL=${VITE_API_URL}" > .env.production && \
    echo "VITE_CUSTOMER_API_URL=${VITE_CUSTOMER_API_URL}" >> .env.production

# Compila o projeto aplicando o modo produção real com os links embutidos
RUN npm run build -- --mode production

# Stage 2: Web Server (Nginx)
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
