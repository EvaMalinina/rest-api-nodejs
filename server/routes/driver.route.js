require('dotenv').config();

const mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
  jwt = require('jsonwebtoken');
  bcrypt = require('bcrypt');
  saltRounds = 9;
  withAuth = require('../middleware');

// User Model
let userSchema = require('../models/User');
let truckSchema = require('../models/Truck');

// CREATE truck
router.post('/:id', async (req, res, next) => {
  
    if (numberOfTrucks.length < 5) {
      const truck = new truckSchema({
        created_by: req.body.created_by,
        assigned_to: req.body.assigned_to,
        status: req.body.status,
        type: req.body.type
      });
      try {
          const savedTruck = await truck.save();
          res.send({truck: truck._id});
      } catch(err) {
          res.status(500).send(err);
      }
    } else {
      res.status(401).json("Your number of trucks riched limit. Contact support.")
    }
});

// READ all trucks
router.get('/', (req, res) => {
  truckSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// READ single driver trucks
const numberOfTrucks = 
router.get('/:id', (req, res, next) => {
  truckSchema.find({ created_by: req.params.id }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});


// UPDATE driver assigned truck
router.put('/truckId', (req, res, next) => {
  
  truckSchema.findById(req.params.id, (err, truckSchema) => {
    
    if (!truckSchema) {
      res.status(404).send("Truck is not found");
    }

    truckSchema.assigned_to = req.body.assigned_to;

    try {
      const savedTruck = truckSchema.save();
      res.json('Truck assign status updated!');

    } catch(err) {
      res.status(500).send(err);
    }
  })
})

// UPDATE not assigned to driver trucks info
router.put('/truckId', (req, res, next) => {
  
  truckSchema.findById(req.params.id, (err, truckSchema) => {
    
    if (!truckSchema) {
      res.status(404).send("Truck is not found");
    }

    if ( truckSchema.assigned_to = "none" ) {
      truckSchema.status = req.body.status;
      truckSchema.type = req.body.type;

      try {
        const savedTruck = truckSchema.save();
        res.json('Truck updated!');

      } catch(err) {
        res.status(500).send(err);
      }
    }
  })
})

// DELETE not assigned to driver trucks
// router.delete('/:id', (req, res, next) => {
//   userSchema.findById(req.params.id, (error, data) => {

//     if (error) {
//       return next(error);
//     } else {
      
//       truckSchema.findByIdAndDelete({assigned_to: "none"}, (error, data) => {
//         if (error) {
//           return next(error);
//         } else {
//           res.status(200).json({
//             msg: data
//           })
//         }
//       })   
//     }
//   })
// })

// DELETE user
router.delete('/:id', (req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;