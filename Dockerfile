# # build environment
FROM node:15.4-alpine as build_image
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN apk add --no-cache --virtual .gyp python make g++ \
    && npm install \
    && apk del .gyp
COPY . ./
RUN npm run build


# # production environment
FROM nginx:stable-alpine
COPY --from=build_image /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
