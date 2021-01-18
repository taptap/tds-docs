FROM taptap-img-registry.cn-beijing.cr.aliyuncs.com/public/nginx-static-site:v0.1.0
COPY ./build /usr/share/nginx/html
