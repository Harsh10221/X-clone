FROM node:22.20.0 AS builder

WORKDIR /app

COPY package.json package-lock.json  ./


RUN npm i 

FROM node:22-alpine 

WORKDIR /app

COPY --from=builder /app .
COPY  /index.js .
COPY /src ./src

EXPOSE 8000

CMD [ "npm","start" ]

