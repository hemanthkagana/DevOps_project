FROM node:16 as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY src/ ./src/
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/src /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]