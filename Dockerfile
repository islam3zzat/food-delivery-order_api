FROM node:8.6

WORKDIR /usr/src/app
COPY . .

EXPOSE 5000
RUN npm run build

CMD [ "npm", "run", "serve" ]

