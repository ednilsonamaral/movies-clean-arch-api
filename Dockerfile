FROM node:20.10.0

LABEL version="1.0" \
      maintainer="Ednilson Amaral <ednilsonamaral.ti@gmail.com>"

WORKDIR /usr/src

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --immutable --prefer-offline --production --ignore-engines

COPY . .

EXPOSE 80

CMD ["node", "dist/index.js"]
