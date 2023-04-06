require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {connection} = require("./Config/db");
const app= express();
const {UserRouter} = require("./Routes/User.Route");
const {authenticate} = require("./Middlewears/Authenticate");

app.use(express.json());
app.use(cors({
    origin:"*"
}));

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.use("/users",UserRouter)
app.use(authenticate);

app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log(`server has been started on ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})