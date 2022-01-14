const express = require("express");
const bcrypt = require("bcrypt-nodejs")
const cors = require("cors")
const knex = require("knex");
//I did npm install pg since I'm using postgreSQL as my database

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL, //heroku database url
    ssl: true
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>{
  res.send("success")
})

//get user by email and compare the input password with the stored hash
app.post("/signin", (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get("/profile/:id", (req, res) => {profile.handleProfileGet(req, res, db)})

app.put("/image", (req, res) => {image.handleImage(req, res, db)})

app.post("/imageurl", (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3001, ()=>{
  console.log(`app is running on port ${process.env.PORT}`);
})
