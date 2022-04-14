# VRWiz Frontend Client

The VRWiz Frontend Client is a web application that allows users to visualize data in VR and connect to the VRWiz backend. The frontend is powered by [Vite](https://vitejs.dev/) and [A-Frame](https://aframe.io/), and uses [Socket.io](https://socket.io/) for real-time communication.

## Environment Variables

To develop locally (or to build for production), you can set environment variables in your `.env` file. You can find a sample `.env` file in the `client` directory named [`.env.example`](./.env.example).

## Available Scripts

In the project directory, you can run the following scripts:

### `npm install`

Installs the frontend dependencies necessary for development.

### `npm run dev`

Runs the frontend server in development mode, which will automatically refresh the browser when any file changes.

### `npm run build`

Builds the frontend for production, which will generate optimized files that can be served by the server.

### `npm run preview`

Serves the production build in the browser.
