# 프론트엔드 빌드
FROM node:20-alpine as build
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Nginx + 런타임 환경변수 주입
FROM nginx:alpine

# 빌드 결과 복사
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# config.template.js 복사 (런타임 주입 템플릿)
COPY config.template.js /usr/share/nginx/html/config.template.js

# Entrypoint 스크립트 복사
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
