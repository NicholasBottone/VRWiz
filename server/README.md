# VRWiz Backend Server

The VRWiz Backend Server is a WebSocket server that runs on Node's built-in HTTPS server and Socket.io. It relays incoming messages from the frontend to all other connected clients.

## Setting up SSL

Since this server runs on HTTPS, you will need to set up an SSL certificate and key to use. For production, you should consider using Let's Encrypt and a tool like [acme.sh](https://acme.sh/) or [certbot](https://certbot.eff.org/).

For development, you can use the following command to generate a self-signed certificate:

```
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.crt -sha256 -days 365 -nodes
```

## Environment Variables

To develop locally (or to deploy to a production environment), you can set environment variables in your `.env` file. You can find a sample `.env` file in the `server` directory named [`.env.example`](./.env.example).

## Available Scripts

In the project directory, you can run the following scripts:

### `npm install`

Installs the backend dependencies necessary for the server to run.

### `npm run dev`

Runs the backend server in development mode, which will automatically restart the server when any file changes.

### `npm run build`

Builds the backend server for production, compiling all of the TS files into JS files in the `dist` directory.

### `npm run clean`

Cleans the `dist` directory.
