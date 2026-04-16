const Customer = require("../models/user.model");
const ejs = require('ejs');
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')


const getSignup = (req, res) => {
    res.render("index");
}

const getSignin = (req, res) => {   
    res.render("form");
}

const getDashboard = (req, res) => {
    res.render("dashboard");
}

const postSignup = (req, res) => {

    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(req.body.password, salt);

  //  overwrite the plain  password with hashed  one
    req.body.password = hashedPassword



    const user = req.body;
    
    const newCustomer = new Customer(user);

    newCustomer.save()
        .then((user) => {
            console.log("Customer saved:", user);
            let transporter = nodemailer.createTransport(
                {
                    service: 'gmail',
                    auth:{
                        user:'ubaidatolasunkanmi58@gmail.com',
                        pass:'oaah utxq accl tjhz'
                    }
                }
            )

            // This is the information about the email you are sending
            let mailOptions = {
                from: 'ubaidatolasunkanmi58@gmail.com',
                to: [user.email],
                subject: 'Welcome to our Application',
                html: 
                `
                        <div style="background-color: #f4f4f4; padding: 0 0 10px; border-radius: 30px 30px 0 0  ;">
                            <div style="padding-top: 20px; height: 100px; border-radius: 30px 30px 0 0 ; background: linear-gradient(-45deg, #f89b29 0%, #ff0f7b 100% );">
                                <h1 style="color:white; text-align: center;">Welcome to our Application</h1>
                            </div>
                            <div style="padding: 30px 0; text-align: center;">
                                <p style="font-size: 18px;"><span style="font-weight: 600;">Congratulations!</span> Your sign-up was successful!</p>
                                <p>Thank you for registering. We are excited to have you on board.</p>
                                <div style="padding: 20px 0;">
                                    <hr style="width: 50%;">
                                    <p style="margin-bottom: 10px;">Best Regards</p>
                                    <p style="color: #f89b29; margin-top: 0;">Dan Star</p>
                                </div>
                            </div>
                        </div>
                `
                
            };
            // This is what will actually send the email
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }

            return res.status(201).json({
            message: "sign up successful",
            user: {
                    id: user._id,
                    Firstname: user.Firstname,
                    Lastname: user.Lastname,
                    email: user.email

                }
            })   
            });
     
            // res.redirect("/user/signin");
        })
    
        .catch((err) => {
            console.error("Error saving to DB:", err);
            res.status(500).send("Error: " + err.message);
        });
}

const postSignin = (req, res) => {
    const { email, password } = req.body;

    Customer.findOne({ email })
        .then((foundCustomers) => {
            if (!foundCustomers) {
                console.log("Incoming email:", email);
                console.log("Invalid email");
                return res.status(400).json({message: "Invalid email "})
            } 

            const isMatch = bcrypt.compareSync(password, foundCustomers.password);

            if (!isMatch){
                console.log("Invalid password")
                return res.status(400).json({message:"Invalid password"})
            }
            // if (foundCustomers.password !== password) {
            //     console.log("Invalid Password");
            //     return res.status(400).json({ message: "Invalid email or password"});
            // }


            // Success
            console.log("Login Successful for", foundCustomers.email);


            // res.redirect("/user/dashboard");

            // success
            return res.json({
                message: "Login sucessful",
                user:{
                    id: foundCustomers._id,
                    email: foundCustomers.email,      
                }
            })

            
        })
        .catch((err) => {
            console.error("Error during signin:", err);
            res.status(500).send("Internal server error");
        });
}

const getAllUsers = (req, res) => {
    Customer.find()
        .then((allUsers) => {
            console.log("All users:", allUsers);
            res.status(200).json(
                {
                    message: "Registered Users",
                    users: allUsers
                }
            );
        })
        .catch((err) => {
            console.error("Error fetching users:", err);
            res.status(500).send("Internal server error");
        });
};




module.exports = { postSignup, getSignup, postSignin, getSignin, getDashboard, getAllUsers }