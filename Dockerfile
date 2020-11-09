FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/cert/ /usr/share/nginx/html/cert/
EXPOSE 8011
