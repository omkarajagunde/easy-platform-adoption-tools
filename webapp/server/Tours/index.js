const app = require("express").Router();
const { ensureUserAllowed } = require("../middleware/index")
var mongoose = require('mongoose');

app.get("/tour", ensureUserAllowed, async (req, res) => {
    try{
        res.status(200).send({ status: 200, message: "Tour List sent successfully", data: JSON.parse(JSON.stringify(req.userObj.tours)) })
    }catch(err){
        res.status(500).send({ status: 500, message: "Error occured : " + err, data: [] })
    }
})

app.post("/tour", ensureUserAllowed, async (req, res) => {
    try{
        if (req.userObj) {

            if (req.body.tourId && req.body.tourId.length > 5) {
                let tours = JSON.parse(JSON.stringify(req.userObj.tours))
                tours.forEach(tour => {
                    if (tour.id.toString() === req.body.tourId) {
                        tour.arr = req.body.walkScreensArr
                        tour.tourName = req.body.tourName
                    }
                })
                req.userObj.tours = [ ...JSON.parse(JSON.stringify(tours)) ]
                let result = await req.userObj.save();
                return res.status(200).send({ status: 200, message: "Tour updated successfully", data: result })
            } else {
                req.userObj.tours = [...req.userObj.tours, { id: mongoose.Types.ObjectId(), arr: req.body.walkScreensArr, tourName: req.body.tourName }]
                let result = await req.userObj.save();
                return res.status(200).send({ status: 200, message: "Tour saved successfully", data: result })   
            }
        }else {
            return res.status(400).send({ status: 400, message: "User with given token not found, please generate a new token and try again!", data: [] })
        }
    }catch(err){
        return res.status(500).send({ status: 500, message: "Error occured : " + err, data: [] })
    }
})

app.put("/tour", ensureUserAllowed, async (req, res) => {

})

app.delete("/tour", ensureUserAllowed, async (req, res) => {

    if (!req.query.tourId) return res.status(400).send({ status: 400, message: "Please provide a valid tourId", data: [] })
    try{
        if (req.userObj) {
            req.userObj.tours = [...req.userObj.tours.filter(tour => tour.id.toString() !== req.query.tourId)]
            let result = await req.userObj.save();
            return res.status(200).send({ status: 200, message: "Tour deleted successfully", data: result })
        }else {
            return res.status(400).send({ status: 400, message: "User with given token not found, please generate a new token and try again!", data: [] })
        }
    }catch(err){
        return res.status(500).send({ status: 500, message: "Error occured : " + err, data: [] })
    }
})

module.exports = app;