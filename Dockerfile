FROM node:16-alpine

WORKDIR /app
RUN npm install
CMD ["node", "dev"]