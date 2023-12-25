FROM node:18.8.0 as builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build --out-dir build-cn
RUN sh .ci/build-hk.sh

FROM nginx:alpine3.17

COPY --from=builder "/app/build-cn" "/usr/share/nginx/html/build-cn"
COPY --from=builder "/app/build-hk" "/usr/share/nginx/html/build-hk"
COPY --from=builder "/app/.ci/default.conf" "/etc/nginx/conf.d/default.conf"
