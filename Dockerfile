# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# 🌟 SOLUÇÃO CRÍTICA: Captura as variáveis da Railway e força a criação do ficheiro .env antes do build
ARG VITE_API_URL
ARG VITE_CUSTOMER_API_URL

RUN echo "VITE_API_URL=${VITE_API_URL}" > .env.production && \
    echo "VITE_CUSTOMER_API_URL=${VITE_CUSTOMER_API_URL}" >> .env.production

# Compila o projeto em modo produção real com as URLs embutidas
RUN npm run build -- --mode production

# Stage 2: Web Server (Nginx)
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
