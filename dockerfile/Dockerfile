# FROM nginx:1.15.6
FROM nginx:1.25.2-alpine3.18-slim

RUN adduser -D -s /bin/sh appuser

RUN mkdir -p /home/files && \
mkdir -p /home/static && \
chown -R appuser:appuser /var/cache && \
chown -R appuser /home

COPY tmp/ /home/static

COPY nginx.conf /etc/nginx/nginx.conf

USER appuser