const app = require("express").Router();
const UserModel = require("../schemas/user");
const { ensureUserAllowed } = require("../middleware/index")

app.get("/tour", ensureUserAllowed, async (req, res) => {
    res.status(200).send({ status: 200, message: "Tour list sent successfully...", data: req.userObj.tours })
})

app.post("/tour", ensureUserAllowed, async (req, res) => {
    try{
        // Create hash of SHA1 type
        let email = req.session.passport.user._json.email
        let hashPwd = crypto.createHash('sha1').update(email).digest('hex');

        // creating user model/Schema
        let userObj = new UserModel.user({
            ...req.userObj
        });

        userObj.tours = req.body.walkScreenArr
        console.log(userObj, req.body);
        //await userObj.save();
    }catch(err){
        console.log("Error occured while saving user to db : ", err)
    }
})

app.put("/tour", ensureUserAllowed, async (req, res) => {

})

app.delete("/tour", ensureUserAllowed, async (req, res) => {
    
})

module.exports = app;