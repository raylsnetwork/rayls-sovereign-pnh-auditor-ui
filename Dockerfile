# Common build stage
FROM node:18.20.2-alpine3.18 as common-build-stage

WORKDIR /app
COPY . /app

RUN export RAYLS_API=#{RAYLS_API}#
RUN echo $RAYLS_API

RUN npm install
RUN npm install -g @angular/cli
RUN npm run build

# Development build stage
FROM common-build-stage as development-build-stage

FROM nginx:1.29.8

RUN apt-get update && apt-get upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=common-build-stage  /app/dist/rayls-auditor-explorer /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf 
COPY nginx.conf /etc/nginx/conf.d/default.conf


CMD ["/bin/sh",  "-c",  "envsubst '${RAYLS_API}' < /usr/share/nginx/html/assets/config-template.json > /usr/share/nginx/html/assets/config.json && exec nginx -g 'daemon off;'"]

EXPOSE 80
