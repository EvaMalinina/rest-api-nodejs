/**
 * @api {patch} /api/trucks/:id/assign Assign driver to truck with specified id. 
 * @apiName Register
 * @apiGroup Truck
 * 
 * @apiHeader (headers) {String} authorization Authorization value.
 * 
 * @apiHeaderExample {json} authorization header example:
 *     {
 *       "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe"
 *     }
 *
 * @apiSuccess {String} status Operation status.
 * 
 * @apiSuccessExample {json} Success response example:
 *     HTTP/1.1 200 OK
 * {
 *  status: "Truck assigned successfully"
 * }
 */
/**
 * @api {post} /api/trucks Create truck(only driver has access).
 * @apiName Create truck
 * @apiGroup Truck
 * 
 * @apiHeader (headers) {String} content-type Payload content type.
 * @apiHeader (headers) {String} authorization Authorization value.
 * 
 * 
 * @apiHeaderExample {json} content-type header example:
 *     {
 *       "Content-type": "application/json"
 *     }
 * @apiHeaderExample {json} authorization header example:
 *     {
 *       "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe"
 *     }
 *
 * @apiParam {String} type Truck type(SPRINTER, SMALL STRAIGHT, LARGE STRAIGHT).
 * 
 * @apiParamExample {json} Payload example:
 *     {
 *       "type": "SPRINTER"
 *     }
 * @apiSuccess {String} status Operation status.
 * 
 * @apiSuccessExample {json} Success response example:
 *     HTTP/1.1 200 OK
 * {
 *  status: "Truck created successfully"
 * }
 */
/**
 * @api {get} /api/trucks Retreive list of trucks(for this driver).
 * @apiName Get trucks
 * @apiGroup Truck
 * 
 * @apiHeader (headers) {String} authorization Authorization value.
 * 
 * @apiHeaderExample {json} authorization header example:
 *     {
 *       "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe"
 *     }
 *
 * @apiSuccess {String} status Operation status.
 * @apiSuccess {Object} status Operation status.
 * 
 * @apiSuccessExample {json} Success response example:
 *     HTTP/1.1 200 OK
 * {
 *    "status": "Truck created successfully"
 *    "trucks": [
 *      {
 *        "_id": "fbawfibaw",
 *        "assigned_to": "",
 *        "status": "OS",
 *        "created_by": "fbawfibaw",
 *        "type": "SPRINTER",
 *        "...": "..."
 *    }
 *  ]
 * }
 */

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
router.post('/', withAuth, async (req, res) => {
  const accessToken = req.header('authorization');
  const truck = new truckSchema({
    created_by: accessToken,
    assigned_to: req.body.assigned_to,
    status: req.body.status,
    type: req.body.type
  });

  try {
    const value = await truckValidation.validateAsync(truck._doc);
    const savedTruck = await truck.save();
    res.status(200).send({ status: "Truck created successfully",
                          truck
                        });
  } catch(err) {
    res.status(500).send(err);
  }
});

// READ all trucks
router.get('/all', (req, res) => {
  truckSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// READ single driver trucks
router.get('/', withAuth, (req, res, next) => {
  const accessToken = req.header('authorization');
  let truck = truckSchema.find({ created_by: accessToken }, (error, data) => {
    console.log(truck._id);
    if (error) {
      return next(error)
    } else {
      res.json({ status: "Truck created successfully", trucks: data})
    }
  })
});


// UPDATE driver assigned truck
router.put('/:id/assign', withAuth, (req, res, next) => {

  truckSchema.findById(req.params.id, (err, truckSchema) => {
    
    if (!truckSchema) {
      res.status(404).send("Truck is not found");
    }

    truckSchema.assigned_to = req.body.assigned_to;

    try {
      const savedTruck = truckSchema.save();
      res.json({ status: "Truck assigned successfully"});

    } catch(err) {
      res.status(500).send(err);
    }
  })
})

// GET all not assigned to driver trucks 
router.get('/:id/notassign', (req, res, next) => {
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

module.exports = router;