FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/cert/ /usr/local/nginx/cert/
EXPOSE 8011
