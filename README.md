# security

## Live demo

The demo is currently live on [Render](https://security-client.onrender.com)

## Running the project

### Requirements

- Docker
- Node ~v18

### Steps

1. In your terminal, navigate to the root of the project
2. Run the following command to install all the dependencies

```bin
$ npm i && (cd client && npm i) && (cd server && npm i)
```

3. Run the following command to seed the database

```bin
$ (cd server && npm run dev-db:initialize)
```

4. After all the dependencies have been installed, you can run the command to start all the required services

```js
$ npm run dev
```

Using [concurrenlty](https://www.npmjs.com/package/concurrently), the project will start client and server locally on ports 3000 and 3001 respectiveliy, and it will start the database inside the docker container; ports 3002 outside and 5432 inside the container
