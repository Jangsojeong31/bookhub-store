#!/bin/sh

# config.js 생성 (런타임 환경변수 주입)
envsubst '${API_BASE_URL}' \
  < /usr/share/nginx/html/config.template.js \
  > /usr/share/nginx/html/config.js

# Nginx 실행
exec nginx -g "daemon off;"
