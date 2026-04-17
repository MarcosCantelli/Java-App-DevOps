#!/bin/sh

set -e

echo "Iniciando Nginx..."
nginx -g "daemon off;" &

echo "Iniciando aplicação Java..."

exec java -jar /app/ecommerce.jar \
  --spring.datasource.url="jdbc:mysql://${DB_HOST}:${DB_PORT}/${DB_NAME}?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=America/Sao_Paulo" \
  --spring.datasource.username="${DB_USER}" \
  --spring.datasource.password="${DB_PASSWORD}"