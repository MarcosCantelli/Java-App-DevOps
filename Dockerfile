# ── Stage 1: Build do Frontend Angular ──────────────────────────────
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build -- --configuration=production

# ── Stage 2: Build do Backend Java ──────────────────────────────────
FROM maven:3.9-eclipse-temurin-17 AS backend-build

WORKDIR /app/backend
COPY backend/pom.xml ./
RUN mvn dependency:go-offline -q
COPY backend/src ./src
RUN mvn package -DskipTests -q

# ── Stage 3: Imagem final ────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

# Instala o Nginx
RUN apk add --no-cache nginx

# Copia o JAR do backend
COPY --from=backend-build /app/backend/target/*.jar /app/ecommerce.jar

# Copia os arquivos do Angular compilado
COPY --from=frontend-build /app/frontend/dist/frontend/browser /usr/share/nginx/html

# Configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 8080

# Script que sobe Nginx + Java juntos
COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]