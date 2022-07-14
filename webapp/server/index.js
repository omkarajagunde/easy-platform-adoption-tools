const express = require('express')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
const next = require('next')
const {ensureAuthenticated} = require("./middleware/index")
const port = parseInt(process.env.PORT, 10) || 5000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const health = require('@cloudnative/health-connect');
const { connectToDb } = require('./utils/mongoUtils');
const handle = app.getRequestHandler()
const crypto = require("crypto")
const UserModel = require('./schemas/user')

app.prepare().then(() => {

    connectToDb()
    // initialise express app
    const server = express()
    server.use(express.json()) 

    server.use(cookieParser());
    server.use(session({ resave: 'true', saveUninitialized: 'true', secret: process.env.SESSION_SECRET }));
    server.use(passport.initialize());
    server.use(passport.session());

    passport.serializeUser(function(user, done) {
            done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
            done(null, obj);
    });

    var OpenIDConnectStrategy = require("passport-ci-oidc").IDaaSOIDCStrategy;
    var Strategy = new OpenIDConnectStrategy(
        {
            discoveryURL:  process.env.DISCOVERY_URL,
            clientID: process.env.CLIENT_ID,
            scope: "email",
            response_type: "code",
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            skipUserProfile: true,
            issuer: process.env.ISSUER_ID,
        },
        function (iss, sub, profile, accessToken, refreshToken, params, done) {
            process.nextTick(function () {
                profile.accessToken = accessToken;
                profile.refreshToken = refreshToken;
                done(null, profile);
            });
        }
    );
    
    passport.use(Strategy); 

    server.get('/login', passport.authenticate('openidconnect', { state: Math.random().toString(36).substr(2, 10) }));

    server.get('/auth/sso/callback', function (req, res, next) {
            var redirect_url = req.session.originalUrl;
            passport.authenticate('openidconnect', {
                    successRedirect: redirect_url,
                    failureRedirect: '/failure'
            })(req, res, next);
    });

    // failure page
    server.get('/failure', function(req, res) {
        res.send('login failed'); 
    });

    server.get('/logout', function (req, res) {
        req.session.destroy();
        req.logout();
        res.redirect('/');
    });


    server.get('/heartbeat', (req, res) => {
        return res.status(200).send({status: 200, message: "Server is healthy and operational"})
    })

    let healthCheck = new health.HealthChecker();
    const livePromise = () => new Promise((resolve, _reject) => {
        const appFunctioning = true;
        // You should change the above to a task to determine if your app is functioning correctly
        if (appFunctioning) {
        resolve();
        } else {
        reject(new Error("App is not functioning correctly"));
        }
    });

    let liveCheck = new health.LivenessCheck("LivenessCheck", livePromise);
    healthCheck.registerLivenessCheck(liveCheck);

    let readyCheck = new health.PingCheck("example.com");
    healthCheck.registerReadinessCheck(readyCheck);

    server.use('/live', health.LivenessEndpoint(healthCheck));
    server.use('/ready', health.ReadinessEndpoint(healthCheck));
    server.use('/health', health.HealthEndpoint(healthCheck));
    server.get('/healthCheck', (req,res) => {
        //res.statusCode(200)
        res.statusCode = 200;
        res.json({
            message: 'Health check done',
            status: 'OK'
        })
    });

    /**
     * This is a very important method that will redirect user to IBMid system
     * for login and post login will redirect user to their route which
     * they tried to navigate in first place
     */
    // [Domain]/auth/loginWithRedirect
    server.get("/loginWithRedirect", ensureAuthenticated, async (req, res) => {
        if (req.session.passport){
            try{
                // Create hash of SHA1 type
                let email = req.session.passport.user._json.email
                let hashPwd = crypto.createHash('sha1').update(email).digest('hex');

                let userObj = await UserModel.user.findOne({ email: email });
                if (!userObj) {
                    // creating user model/Schema
                    userObj = new UserModel.user({
                        hashedToken: hashPwd,
                        email: email,
                        profileObj: req.session.passport.user
                    });
                    await userObj.save();
                    console.log("Successfully saved user : ")
                }else {
                    console.log("User identified, already present, just redirecting to now")
                }
            }catch(err){
                console.log("Error occured while saving user to db : ", err)
            }
        }
        res.redirect(302, "/generateToken")
    })

    server.get('/get/profile', async (req, res) => {
        if (req.session.passport){
            try{
                let email = req.session.passport.user._json.email
                let userObj = await UserModel.user.findOne({ email: email });
                if (userObj) {
                    res.status(200).send({ status: 200, message: "profile details sent succesfully", data: { profile: userObj.profileObj, hashedToken: userObj.hashedToken } })
                }else {
                    res.status(400).send({ status: 400, message: "No profile found, please login to get profile", data: [] })
                }
            }catch(err){
                console.log("Error occured while saving user to db : ", err)
            }
            
        }else{
            res.status(400).send({ status: 400, message: "No profile found, please login to get profile", data: [] })
        }
    })

    const TourRoutes = require("./Tours/index")
    server.use('/v1/api', TourRoutes)

    // App Routes
    server.all("*", (req, res) => {
        return handle(req, res)
    })
    

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})