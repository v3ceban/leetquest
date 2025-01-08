# Dev image

FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json .

COPY prisma ./prisma

RUN npm install && \
    npx prisma generate && \
    npm cache clean --force

COPY . .

EXPOSE 3000
EXPOSE 5555

CMD ["npm", "run", "dev"]
