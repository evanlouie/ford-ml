FROM node:10

WORKDIR /app
COPY ./package.json .
COPY ./yarn.lock .
RUN npm install -g yarn
RUN yarn global add serve
RUN yarn
ADD . .
RUN yarn build

EXPOSE 5000
CMD serve -s build
