# create a file named Dockerfile
FROM node:argon

RUN mkdir /api
WORKDIR /api

COPY package.json /api
RUN npm install

COPY . /api

EXPOSE 8000

CMD ["npm", "run-script", "seed"]
CMD ["npm", "start"]