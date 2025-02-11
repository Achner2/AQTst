# Etapa 1: Construcción de la aplicación Angular
FROM node:18 AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación en modo producción
RUN npm run build --prod


# Usa una imagen base de Nginx
FROM nginx:alpine

# Copia el build de Angular a la carpeta de Nginx
COPY dist/login-api/browser /usr/share/nginx/html

# Copia el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto de Nginx
EXPOSE 4200


# Ejecuta Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]