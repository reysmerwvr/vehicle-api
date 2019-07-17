# Vehicle API application

This is the API for vehicle app.

## Requirements

  - Node.js >= 10.16.0
  - npm >= 6.10.1

## Version

1.0.0

## Installation

Download zip file and extract it [latest pre-built release](https://github.com/reysmerwvr/vehicle-api). Or clone the repository and cd into it.

Vehicle-API uses a number of open source projects to work properly:

* [Restify] - The future of Node.js REST development
* [Mongo] - The database for modern applications
* [Mongoose] - Elegant mongodb object modeling for node.js

Install the dependencies and start the server.

## Setup

Install apidoc globally
```bash
npm install apidoc -g
```

Install the dependencies.

```bash
cd vehicle-api
npm install
apidoc -i ./routes/ -o ./apidocs
```
Enter your configuration in config.js file. (Mongo Database Connection, Port, Environment)

### Seeds

Run the following command to run startup seeds.

```bash
npm run-script seeds
```

### Run

Run the following command to start the development server

```bash
npm start or node index.js
```

Once your server is running if you want to see the API Documentation please visit: [API Docs](https://localhost:3000/apidocs/index.html)

### Todos
  - Write tests
  - Add code comments
  - Add server validations
  - Add real car photos

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does 
its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Restify]: <http://restify.com/>
   [Mongo]: <https://www.mongodb.com/>
   [Mongoose]: <https://mongoosejs.com/>