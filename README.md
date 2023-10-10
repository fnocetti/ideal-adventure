# Bookshop

This repo contains two projects (client and server). It's not a monorepo. Each project is its own npm package.
To install and run the apps, make sure you're using the lates LTS Node.js version.

## Run the server (favorites service)

- `cd server`
- `npm install`
- `npm start`

You can configure the port the server will listen on by setting the PORT env variable e.g. `PORT=9999 npm run start`. Default is `3004`

## Run the client

- `cd app`
- `npm install`
- `npm run build`
- `npm run start`

You can configure the port the client will be accessible through by setting the PORT variable e.g. `PORT=9999 npm run start`. Default is `3000`.
If you changed the port on the server you will also need to pass the new URL on the FAVORITES_SERVICE variable. e.g. `FAVORITES_SERVICE=http://localhost:9999`. Don't include a trailing slash. If you didn't change the server port, you don't need to add this.
