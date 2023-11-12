FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:18-alpine AS final
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package.json .
COPY package-lock.json .
RUN npm ci --production
EXPOSE 3001
RUN npm run db:initialize
CMD npm run start
