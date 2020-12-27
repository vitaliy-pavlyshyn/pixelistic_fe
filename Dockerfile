FROM ubuntu:20.04 as build_image
RUN apt update -y && apt install nodejs -y && apt install npm -y
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build


FROM ubuntu:20.04
ENV TZ=Europe/Kiev
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt update -y && apt install npm -y && npm i npm install -g serve
WORKDIR /app
COPY --from=build_image /app/build /app/build
EXPOSE 80
RUN pwd
CMD serve -s build -l 80

# FROM nginx:alpine
# # Nginx config
# RUN rm -rf /etc/nginx/conf.d
# COPY conf /etc/nginx
# COPY --from=build_image /app/build /usr/share/nginx/html/
# EXPOSE 80
# # Copy .env file and shell script to container
# WORKDIR /usr/share/nginx/html
# COPY ./env.sh .
# COPY .env .
# # Add bash
# RUN apk add --no-cache bash
# # Make our shell script executable
# RUN chmod +x env.sh
# # Start Nginx server
# CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]