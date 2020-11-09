FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY 1_lzxxy.vip_bundle.crt /usr/share/nginx/html/cert/1_lzxxy.vip_bundle.crt
COPY 2_lzxxy.vip.key /usr/share/nginx/html/cert/2_lzxxy.vip.key
EXPOSE 8011
