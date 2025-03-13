const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const user = require("./models/user")
const dbConnection = require("./config/db")
const app = express()
dotenv.config()


const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

dbConnection(MONGO_URI)

.then(() =>{
  console.log("MongoDB connected succesfully")
  app.listen(PORT, () => {
    console.log(`server is listening on PORT ${PORT}`);
  });
})
.catch((error) => {
  console.log("error:",error)
})

app.get("/home",(req,res) => {
  res.send("Succesfully deployed backend")
})

app.post("/register", async(req,res) => {
 const {name,email,password} = req.body
 try{

  const emailPresent = await user.findOne({email})
  if (emailPresent) {
    return res.status(400).json({mesaage:"Email already exists"})
  }
  const saveUser = new user({name,email,password})
  await saveUser.save()
  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
 }
 catch(error){
  res.status(500).json({ error: error.message });
 }
})
