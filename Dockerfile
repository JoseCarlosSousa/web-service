# Etapa 1: Compilação (Build)
FROM node:20-alpine AS build

WORKDIR /app

# Copiar os ficheiros de dependências
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o resto do código do projeto
COPY . .

# Compilar o projeto para produção (gera a pasta dist)
RUN npm run build

# Etapa 2: Servidor Web (Nginx)
FROM nginx:alpine

# Copiar a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar os ficheiros compilados
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]