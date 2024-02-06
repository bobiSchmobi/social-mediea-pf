# Students application
Basic web application for demonstrating core client/server architecture concepts as well as the main technologies involved.

> Not supposed to be used in any production environment, only for educational purposes

## Project structure

### backend
Simple node application `backend/index.js` with a CRUD (Create, Read, Update, and Delete) operations exposed as a HTTP service. Manipulating a dummy file based data storage `backend/students.json`

### frontend
Plain HTML / CSS / Javascript project for creating an interface to manipulate the students API.

## Set up

Make sure you have [node.js](https://nodejs.org/en) installed.

Install project dependencies
```
npm install;
```

Starts backend service on port 3000
```
node backend/index.js
```

Start frontend application on port 8080 [open a new terminal instance]
```
npx http-server frontend

```
