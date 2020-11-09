FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY 1_lzxxy.vip_bundle.crt /etc/nginx/1_lzxxy.vip_bundle.crt
COPY 2_lzxxy.vip.key /etc/nginx/2_lzxxy.vip.key
EXPOSE 8011
