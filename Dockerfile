FROM nginx:alpine
COPY ./build /usr/share/nginx/html
COPY ./.ci/default.conf /etc/nginx/conf.d/default.conf
