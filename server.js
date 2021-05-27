const express=require('express');
const mongoose =require('mongoose');
var cors = require('cors');

require('dotenv').config();

const app=express();
app.use(express.json());
app.use(cors())


const port=process.env.port||5000;

const database_url=process.env.DataBase_URL;
mongoose.connect(database_url,{useNewUrlParser:true,useCreateIndex:true})

const connection=mongoose.connection;
connection.once('open',()=>{
console.log('Database Connection established')});

const TodoRoute = require("./Routes/Todo.route");
const UserRoute = require("./Routes/user.route");

app.use('/todo',TodoRoute);
app.use('/user',UserRoute);


app.listen(port,()=>{
    console.log(`server is listening on port:${port}`);
})