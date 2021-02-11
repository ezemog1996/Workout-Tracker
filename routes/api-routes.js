const Workout = require("../models/workout");

module.exports = function(app) {
    app.get('/api/workouts', (req, res) => {
        Workout.aggregate([
          {
            $addFields: {
              totalDuration: {
                $sum: '$exercises.duration',
              },
            },
          },
        ])
          .then((dbWorkouts) => {
            console.log(dbWorkouts)
            res.json(dbWorkouts);
          })
          .catch((err) => {
            res.json(err);
          });
      });

    app.put("/api/workouts/:id", (req, res) => {
        Workout.findByIdAndUpdate(
            req.params.id, 
            {
                $push: { exercises: req.body }
            }
        )
            .then( result => {
                console.log(result);
                res.json(result);
            })
            .catch(err => {
                res.status(400).json(err);
            })
    });

    app.post("/api/workouts", (req, res) => {
        Workout.create({})
            .then(result => {
                console.log("*****",result);
                res.json(result)
            })
            .catch(err => {
                res.status(400).json(err);
            })
    });

    app.get("/api/workouts/range", (req, res) => {
        Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: '$exercises.duration'
                    }
                }
            }
        ]).sort({_id: -1}).limit(7)
        .then( result => {
            console.log(result);
            res.json(result);
        })
        .catch(err => {
            res.status(400).json(err);
        })
    })
}