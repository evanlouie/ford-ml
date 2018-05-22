FROM node:10
WORKDIR /app

# Install Yarn and Serve
RUN npm install -g yarn
RUN yarn global add serve

# Install Deps
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn
ADD . .
RUN yarn build

# Main
EXPOSE 5000
CMD serve -s build
