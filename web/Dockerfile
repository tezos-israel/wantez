
FROM node:12

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY . .
RUN yarn

# Copying source files

# Building app
RUN yarn build

# Running the app
CMD [ "yarn", "start" ]