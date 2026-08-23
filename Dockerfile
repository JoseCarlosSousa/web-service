# Stage 1: Build the React application
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# 🌟 ADD THESE TWO LINES: Accept build argument and pass it to Vite
ARG VITE_MODE=production
RUN npm run build -- --mode ${VITE_MODE}

# Stage 2: Web Server (Nginx)
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
