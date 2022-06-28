// MongoDB connection
const UserModel = require('../schemas/user')
const ensureAuthenticated = (req, res, next) => {
        if (!req.isAuthenticated()) {
                req.session.originalUrl = req.originalUrl;
                res.redirect('/login');
        } else {
                return next();
        }
}

const ensureUserAllowed = async (req, res, next) => {
        try{
                let token = req.body.token
                let userObj = await UserModel.user.findOne({ hashedToken: token });
                if (userObj) {
                        req.userObj = userObj
                        next()
                }else {
                        res.status(400).send({ status: 400, message: "Token is invalid, please pass in correct token", data: [] })
                }
        }catch(err){
                res.status(400).send({ status: 400, message: "User is invalid, please generate token at https://[beeguide-website-domain].com/generateToken, insert the token and try again!", data: [] })
        }
        next()
}

module.exports = { ensureAuthenticated, ensureUserAllowed }

