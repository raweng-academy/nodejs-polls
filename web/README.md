# mern-polls web
### Prerequisite for the project
-  Nodejs with Npm installed.
   Can be found at https://nodejs.org/en/download/
- Visual studio code. with command line `code` enabled.
- Create Account with mongodb atlas and create a cluster
- Github account setup with ssh keys added in account.

**npm** is a node package manager for nodejs.
Allows you to download and install node libraries in project.


###  1. Create project dir.
```bash    
    # Make directory
    mkdir nodejs-polls
    
    # change directory
    cd nodejs-polls
```
### Setup git
```bash    
    git init
```

### Create web directory
```bash    
    npx create-react-app web
    cd web     
    # Open the project in Vs code IDE 
    code .
```
### run project
```bash 
    npm start
```

### Setup components.
```bash    
    # make project nodejs ready
    mkdir components
    touch components/poll.js
    

```

### Create 
```javascript
    // server.js
    const express = require('express');
    const app = express();

    const PORT = process.env.PORT || 5000;

    // configure body parser for AJAX requests
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // routes
    app.get('/', (req, res) => {
        res.send('Hello from Nodejs');
    });

    // Bootstrap server
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}.`);
    });
```

###  run the project 
```bash   
    npm start
    # open localhost:5000 in browser
 
    # You should see Hello from Nodejs
```
###  install nodemon  
```bash   
    npm install -g nodemon
```
###  verify if the prject is running propertly
    Go to localhost:3000

### add env support
```bash    
    # install .env support
    npm install dotenv

    # add below to server.js imports
    require('dotenv').config() 

    touch .env       
```

### initalize mongoose ODM
```bash    

    # Add mongodb URI to .env

    // .env
    MONGO_DB=mongodb://localhost:27017    
    
    #  create configs directory
    mkdir config
    # Create file config/db.js
    touch config/db.js
```    

```javascript
    // db.js 
    const mongoose = require('mongoose');
    const connection = mongoose.connection;
    const uri = process.env.MONGO_DB;

    mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

    connection.once('open', () => {
    console.log(
        "MongoDB database connection established successfully");
    })
    module.exports = mongoose;
```

### create projects dir
    mkdir models 
    mkdir services
    mkdir controllers
    mkdir routes


```
###  Add stylesheet   
```css
body {
  margin: 0;
}

.App {
  display: flex;
  flex-direction: column;  
  background: #f2709c; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ff9472,
    #f2709c
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ff9472,
    #f2709c
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: 100vh; 
}

.appHeader {
  font-size: 16px;
}

.appBody {
  margin-top: 100px;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
}

.pollTitle {
  font-size: 48px;
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
}

.pollChoices {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  border-radius: 4px;
  background: white;
  -webkit-box-shadow: 0px 32px 58px -28px rgba(0, 0, 0, 0.28);
  -moz-box-shadow: 0px 32px 58px -28px rgba(0, 0, 0, 0.28);
  box-shadow: 0px 32px 58px -28px rgba(0, 0, 0, 0.28);
}

.choice {
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: black;
  height: 100%;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  letter-spacing: 1px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently */
  background: transparent;
  border: none;
  outline: none;  
}

.choice p, input.choice, input.posllSubmit {
  margin: 0;  
  background: linear-gradient(
    to right,
    #ff9472,
    #f2709c
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  max-width: 100px;
}

.choice:disabled {
  cursor: auto;
}

.choice:first-of-type::after, .divider {
  height: 50%;
  width: 1px;
  background: rgb(75, 66, 66);
  right: 0;
  position: absolute;
  content: "";
}

.active {
  flex: 2.2;
  transition: 500ms ease-in-out;
}

.nav li {
  display: inline;
  margin: 10px;
  font-size: 18px;  
}
.nav li a {
  color: #fafafa;  
}

.form label {
  color: #fff;
  font-size: 22px;  
}

form input.pollTitle {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #fafafa;
  border-radius: 0;
  outline: none;
  height: 3rem;
  width: 100%;
  text-align: center;
  font-size: 32px;
  margin: 0 0 20px 0;
  padding: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-transition: border .3s, -webkit-box-shadow .3s;
  transition: border .3s, -webkit-box-shadow .3s;
  transition: box-shadow .3s, border .3s;
  transition: box-shadow .3s, border .3s, -webkit-box-shadow .3s;  
}

form .pollSubmit {
  margin: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 400px;
  height: 50px;
  border: none;
  border-radius: 4px;
  background: white;
  -webkit-box-shadow: 0px 32px 58px -28px rgba(0, 0, 0, 0.28);
  -moz-box-shadow: 0px 32px 58px -28px rgba(0, 0, 0, 0.28);
  box-shadow: 0px 32px 58px -28px rgba(0, 0, 0, 0.28);
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: black;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  letter-spacing: 1px;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently */
  border: none;
  outline: none;  
}
form ::-webkit-input-placeholder {
  text-align: center;
  color: whitesmoke;
}
form  :-moz-placeholder {
  text-align: center;
  color: whitesmoke;
}

form .divider {
  position: relative;
  height: 50%;
  width: 1px;
  background: rgb(75, 66, 66);
  right: 0;  
  content: "";
}
.poolList a {
  font-size: 18px;
}
.poolList a:link {
  color: white;
  background-color: transparent;
  text-decoration: none;
}

.poolList a:visited {
  color: white;
  background-color: transparent;
  text-decoration: none;
}
```
### deploy to heroku
```bash    
    # Deploy web
    cd web
    git init
    git add . -A 
    git commit -m "Push to heroku"
    heroku create <ANYAppNAME> --buildpack mars/create-react-app
    heroku config:set REACT_APP_BACKEND=""    
    git push heroku master
```    