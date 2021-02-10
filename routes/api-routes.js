const db = require("../models");
const Workout = require("../models/workout");

module.exports = function(app) {
    app.get("/api/workouts", (req, res) => {

    });

    app.put("/api/workouts/:id", (req, res) => {
        Workout.create(req.body)
            .then( result => {
                console.log(result)
            })
            .catch(err => {
                res.status(400).json(err);
            })
    });

    app.post("/api/workouts", (req, res) => {
        Workout.find({})
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    });

    app.get("/api/workouts/range", (req, res) => {

    })
}