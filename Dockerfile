# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# 🌟 ACEITA OS ARGUMENTOS DA RAILWAY DURANTE O BUILD
ARG VITE_MODE=production
ARG VITE_API_URL
ARG VITE_CUSTOMER_API_URL

# 🌟 EXPORTA COMO VARIÁVEIS PARA O VITE LER NO COMANDO ABAIXO
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CUSTOMER_API_URL=$VITE_CUSTOMER_API_URL

RUN npm run build -- --mode ${VITE_MODE}

# Stage 2: Web Server (Nginx)
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
