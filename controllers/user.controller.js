const Customer = require("../models/user.model")
const ejs = require("ejs")
 

const postSignup =( (req, res)=>{
  const user = req.body
//   users.push(user)
  const newCustomer = new Customer(user)
  newCustomer.save()
  .then((user)=>{
    console.log("Customer saved:", user);
  res.send("You have successfully registered")
    
  })
  .catch((err)=>{
    console.log("Error saving to DB",  err);
    res.status(500).send("Error:" + err.message)
    
  })
})


const getSignup = (req, res)=>{
    res.render( 'index')
}

module.exports= {postSignup, getSignup}
