const User = require('../models/user.js');
const express = require('express');
const router = express.Router();
const bcrypt= require('bcryptjs');


/**
 *Create User Registration
 *@POST {{baseUrl}}/api/v1/register
*/
router.post('/register',async(req,res)=>{
    try{
        const salt = bcrypt.genSaltSync();
        const password = req.body.password ; 
        const hashedPassword = bcrypt.hashSync(password,salt)
        req.body.password = hashedPassword

        const newUser= await User.create(req.body)
        console.log('created user',newUser)
        req.session.userId = newUser._id
        req.session.username = newUser.username;
        req.session.logged = true;

        res.status(200).send({
            success: true,
            message: " User Succesfully created",
            data: newUser
        })
    }
    catch(err){
            res.status(500).send({
                success: false,
                message: err
            })     
    }
});

/**
 *Fetch User Registration through Login
 *@POST {{baseUrl}}/api/v1/admin/login
*/
router.post('/login', async(req,res)=>{
    //Query Database to see if User Exists in Database
    try{
        const foundUser = await User.findOne({username: req.body.username})
        const password = req.body.password ; 
        console.log('found User', foundUser)
        //If user is found, Use bcrypt to swee if their password is valid
            if(foundUser){
                const passwordIsValid = bcrypt.compareSync(password, foundUser.password)
                console.log(foundUser.password)

                if(passwordIsValid){ //Set Session if Password is Valid
                    req.session.userId = foundUser._id
                    req.session.username = foundUser.username;
                    req.session.logged = true;
                    return res.status(200).send({
                        data:foundUser,
                        message: "User has succesfully logged in"
                    })
                }
                else{
                    return res.status(500).send({
                        message: "Invalid Credentials"
                    })
                }
    }
}
    catch(err){
        return res.status(500).send({
            success: false,
            message: error
        })
    }
});

/**
 *Log Out 
 *@POST {{baseUrl}}/api/v1/admin/logout
*/
router.get('/logout', (req, res) => {
    console.log(req.session, " Rqq.session");
    req.session.destroy((err) => {
      if(err){
        res.send(err);
      } else {
        res.redirect('/');// Redirect back to homepage
      }
    })

  });


  /**
 *Log Out 
 *@POST {{baseUrl}}/api/v1/admin/users/all
*/

router.get('/', async (req,res)=> {
    try {
        const allUsers = await User.find();
        return res.status(200).send({
            message: "All users Fetched", 
            data: allUsers
          });
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error
        })
    }
});
module.exports = router;