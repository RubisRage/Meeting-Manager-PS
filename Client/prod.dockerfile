FROM node:lts as node

WORKDIR /client


RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:alpine

COPY --from=node /client/dist/client /usr/share/nginx/html
