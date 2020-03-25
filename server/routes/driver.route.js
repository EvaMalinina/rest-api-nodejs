let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// driver Model
let driverSchema = require('../models/Driver');

// CREATE Drivers
router.route('/drivers').post((req, res, next) => {
  driverSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ Drivers
router.route('/drivers').get((req, res) => {
  driverSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single driver
router.route('/driver/:id').get((req, res) => {
  driverSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update driver
router.route('/driver/:id').put((req, res, next) => {
  driverSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Driver updated successfully!')
    }
  })
})

// Delete driver
router.route('/driver/:id').delete((req, res, next) => {
  driverSchema.findByIdAndRemove(req.params.id, (error, data) => {
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