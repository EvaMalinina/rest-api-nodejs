require('dotenv').config();

const express = require('express'),
  router = express.Router();
  jwt = require('jsonwebtoken');
  bcrypt = require('bcrypt');
  saltRounds = 9;
  withAuth = require('../middleware');
  truckValidation = require('../validation/truck.validation');
  loadValidation = require('../validation/load.validation');
  

// Models
let truckSchema = require('../models/Truck');
let loadSchema = require('../models/Load');

// CREATE truck
router.post('/:id', async (req, res) => {
  const truck = new truckSchema({
    created_by: req.body.created_by,
    assigned_to: req.body.assigned_to,
    status: req.body.status,
    type: req.body.type
  });

  try {
    const value = await truckValidation.validateAsync(truck._doc);
    const savedTruck = await truck.save();
    res.send({truck});

  } catch(err) {
    res.status(500).send(err);
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
router.put('/assignment/:id', (req, res, next) => {

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

// GET all not assigned to driver trucks 
router.get('/:id/trucks', (req, res, next) => {
  truckSchema.find({ created_by: req.params.id, assigned_to: "none" }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// UPDATE not assigned to driver trucks info 
router.put('/mutation/:id', (req, res, next) => {
  truckSchema.findById(req.params.id, async (err, truckSchema) => {

    if (!truckSchema) {
      res.status(404).send("Truck is not found");
    }

    try {

      if ( truckSchema.assigned_to = "none") {
        truckSchema.type = req.body.type;
      } else {
        res.status(500).send("This truck is already assigned. You can not change info of assigned truck.")
      }

      const savedTruck = truckSchema.save();
      res.json("Truck type have been changed.");

    } catch(err) {
      res.status(500).send(err);
    }
  })
});

// DELETE not assigned to driver trucks
router.delete('/bin/:id', (req, res, next) => {   
  truckSchema.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      if ( truckSchema.assigned_to == "none") {
        res.status(200).json({
          msg: data
        })
      } else {
        res.status(500).send("This truck is already assigned. You can not delete assigned truck.")
        }
    }
  })
});

// READ assigned to driver load info
router.get('/:id/load', (req, res, next) => {
  loadSchema.find({ assigned_to: req.params.id }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// change status of assigned load
router.put('/load/mutation/:id', (req, res, next) => {
  loadSchema.findById(req.params.id,  async (err, loadSchema) => {
    
    if (!loadSchema) {
      res.status(404).send("Load is not found.");
    }

    loadSchema.state = req.body.state;

    try {
      const value = await loadValidation.validateAsync(loadSchema._doc);
      const savedLoad = loadSchema.save();
      res.json('Load state updated!');

    } catch(err) {
      res.status(500).send(err);
    }
  })
})

module.exports = router;