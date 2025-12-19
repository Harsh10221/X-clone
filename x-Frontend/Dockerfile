FROM node:22.20.0 AS builder

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .
COPY ./src ./src
COPY vite.config.js .
COPY tailwind.config.js .
COPY postcss.config.js .

COPY ./index.html .

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/ngnix/conf.d/default.conf 
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]

