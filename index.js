const express = require('express')
const cors = require('cors')
const ejs = require("ejs") 
const app = express()
const mongoose = require("mongoose")
const userRoute = require("./routes/user.route")
const dotenv = require("dotenv") 
dotenv.config()
const URI = process.env.MONGODB_URI;
// const users =[]

const port = process.env.PORT
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
mongoose.connect(URI)
.then(()=>{
    console.log("Connected to mongodb");
})
.catch((err)=>{
    console.log("error", err);
    
})
app.set("view engine", "ejs")



// app.get('/home', (req, res) => {
//   res.send('Hello World!')
//   console.log("Welcome");
// })

// // app.get('/signup', )
// app.get('/signin', (req, res)=>{
//     res.render('form')
// })

// app.post('/register')
  

app.use("/user", userRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log("Server is runing ");
})