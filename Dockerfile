FROM node:23-alpine3.20

WORKDIR /app
EXPOSE 5002
COPY . .

RUN npm install
CMD [ "node", "index.js" ]  