# SnackTime

## About



## Deployed Link
[SnackTime]()

## Application Preview

### Welcome Page
![Welcome Page]()

### Parent HomePage
![Parent Home Page]()

### Staff HomePage
![Staff Home Page]()

### Student Page
![Student Page]()

### Student Report Archive
![Report Archive]()

## Technologies used
1. React.js
2. Node.js
3. Express.js
4. Sequelize with MySQL dialect
5. NodeMailer
6. BCrypt to store encrypted passwords

## Node Packages used
1. express
    * usage
    ```require("express")```
    * It is a fast, unopinionated, minimalist web framework for node.
    * For more information: [express](https://expressjs.com)

2. mysql
    * usage
    ```require("mysql")```
    * A node package that is used to connect to mysql server and thus allows us to run queries on database tables; It also aloows us to delete, update or insert into the database tables.
    * For more information: [mysql](https://www.npmjs.com/package/mysql)

3. body-parser
    * usage
    ```require("body-parser")```
    * Node.js body parsing middleware.Parses incoming request bodies in a middleware before handlers, available under the req.body property.
    * For more information: [body-parser](https://www.npmjs.com/package/body-parser)

4. sequelize
    * usage
    ```sequelize init:config```
    ```sequelize init:models```
    * It is a promise-based ORM for Node.js. These two command when run on terminal after npm install sequelize create 2 files config.json and index.js. Config.json will provide the configuartion for connecting to database while index.js imports sequelize and creates an object 'db' that is exported. This object contains all the models as a key. When imported on a controller page, these keys can be used to access the models.
    * For more infromation: [sequelize](http://docs.sequelizejs.com)

## Execution steps on local machine
1. Make sure node is installed on your machine. You can visit the website [Node Installation](http://blog.teamtreehouse.com/install-node-js-npm-mac) for instructions.
2. Download/Clone the respository.
3. On terminal, go inside Code-Mason folder and type npm install. This will install all the dependencies required to run the application mentioned in package.json.
4. Make sure mysql is installed on the localhost/other server.
5. Log into mysql workbench and execute db/schema.sql from the repository. This will create the database on the server.
6. Open config.json and change development.user, development.password with your values.
7. Inside Code-Mason folder on terminal, type "node server.js" on terminal. This will start the server.
8. Open the browser and type "localhost:8080". This will start executing the client part of the application.


## Code snippets
### server

### models
![Models and Relationships]()

### view

### controller




## Learning points
1. Creating a full stack web application.
2. Learning how the server and client interact with requests and responses.
3. How to create a server and how it starts listening for the clients' requests on a particular port.
4. How the models, controllers and views interact in MVC architecture. We also used callbacks in this app for this interaction.
5. Various types of ajax client requests i.e post,get,put,delete to database server
6. Sending various types of responses to clients including serving an html page or sending back data as json object.
7. How to query on database using a req.body or req.params
8. Using sequelize package to interact with mysql server. This included creating connection, reading, updating, creating, deleting data using sequelize methods.
9. Using Highlight.js for better user experience.
10. Incorporating google sign-in in the appliction
11. Deploying application on heroku.


## Authors
* [Ajita Srivastava Github](https://github.com/ajitas)  |  [Ajita Srivastava Portfolio](https://ajitas.github.io/Portfolio/)

* [Taylor Skeels Github](https://github.com/skeeis)  |  [Taylor Skeels Portfolio](https://skeeis.github.io/Personal-Portfolio/)

* [Craig Melville Github](https://github.com/acekreations)  |  [Craig Melville Portfolio](https://acekreations.github.io/Portfolio/)

## License
Standard MIT License
