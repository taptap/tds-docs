FROM nginx:alpine
COPY ./build-cn /usr/share/nginx/html/build-cn
COPY ./build-hk /usr/share/nginx/html/build-hk
COPY ./.ci/default.conf /etc/nginx/conf.d/default.conf