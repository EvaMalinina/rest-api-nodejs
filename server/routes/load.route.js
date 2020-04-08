/**
 * @api {patch} /api/loads/:id/state Change load state(only driver has access, for only active load).
 * @apiName Change load state
 * @apiGroup Load
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
 *  status: "Load status changed successfully"
 * }
 */
/**
 * @api {post} /api/loads Create load(only shipper has access).
 * @apiName Create load 
 * @apiGroup Load
 * 
 * @apiHeader (headers) {String} content-type Payload content type.
 * @apiHeader (headers) {String} authorization Authorization value.
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
 * @apiParam {Object} dimensions Load dimensions.
 * @apiParam {Integer} payload Load weight.
 * 
 * @apiParamExample {json} Payload example:
 *     {
 *        "payload": 100, 
 *        "dimensions": {
 *            length: 100, 
 *            width: 100, 
 *            height: 100
 *        } 
 *      }
 *     }
 * @apiSuccess {String} status Operation status.
 * 
 * @apiSuccessExample {json} Success response example:
 *     HTTP/1.1 200 OK
 * {
 *  status: "Load created successfully""
 * }
 */
/**
 * @api {patch} /api/loads/:id/state Change load state(only driver has access, for only active load).
 * @apiName Change load state
 * @apiGroup Load
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
 *  status: "Load status changed successfully"
 * }
 */
/**
 * @api {patch} /api/loads/:id/post Post load(only shipped has access).
 * @apiName Post load 
 * @apiGroup Load
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
 *  "status": "Load posted successfully",
 *  "assigned_to": "somebody"
 * }
 * @apiErrorExample {json} No driver found response:
 *     HTTP/1.1 404 Not Found
 * {
 *  "status": "No drivers found"
 * }
 */
 /**
 * @api {get} /api/loads/ Retreive active for this driver loads.
 * @apiName Get loads of driver
 * @apiGroup Load
 * 
 * @apiHeader (headers) {String} authorization Authorization value.
 * 
 * @apiHeaderExample {json} authorization header example:
 *     {
 *       "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe"
 *     }
 *
 * @apiSuccess {String} status Operation status.
 * @apiSuccess {Object} loads Operation status.
 * 
 * @apiSuccessExample {json} Success response example:
 *     HTTP/1.1 200 OK
 * {
 *  "status": "Success"
 *  "loads": [
 *    {
 *        "_id": "fbawfibaw",
 *        "assigned_to": "noifawnfoian",
 *        "created_by": "jfnaikfna",
 *        "status": "ASSIGNED",
 *        "state": "En route to Pick Up",
 *        "logs": [{"message": "Load created", time: 12312}],
 *        "payload": 100,
 *        "dimensions": {length: 100, width: 100, height: 100}
 *        "...": "..."
 *    }
 *  ]
 * }
 */
/**
 * @api {get} /api/loads/ Retreive list of loads(for this shipper).
 * @apiName Get loads of shipper
 * @apiGroup Load
 * 
 * @apiHeader (headers) {String} authorization Authorization value.
 * 
 * @apiHeaderExample {json} authorization header example:
 *     {
 *       "Authorization": "JWT fnawilfmnaiwngainegnwegneiwngoiwe"
 *     }
 *
 * @apiSuccess {String} status Operation status.
 * @apiSuccess {Object} loads Operation status.
 * 
 * @apiSuccessExample {json} Success response example:
 *     HTTP/1.1 200 OK
 * {
 *  "status": "Success"
 *  "loads": [
 *    {
 *        "_id": "fbawfibaw",
 *        "assigned_to": "noifawnfoian",
 *        "created_by": "jfnaikfna",
 *        "status": "NEW",
 *        "state": "En route to Pick Up",
 *        "logs": [{"message": "Load created", time: 12312}],
 *        "payload": 100,
 *        "dimensions": {length: 100, width: 100, height: 100}
 *        "...": "..."
 *    }
 *  ]
 * }
 */

const express = require('express'),
      router = express.Router();
      withAuth = require('../middleware');

// Models
let loadSchema = require('../models/Load');
let truckSchema = require('../models/Truck');

// Driver change status of assigned load
router.put('/:id/state', withAuth, (req, res, next) => {
  loadSchema.findById(req.params.id,  async (err, loadSchema) => {
    
    if (!loadSchema) {
      res.status(404).send("Load is not found.");
    }

    loadSchema.state = req.body.state;

    try {
      const value = await loadValidation.validateAsync(loadSchema._doc);
      const savedLoad = loadSchema.save();
      res.json('Load status changed successfully.');

    } catch(err) {
      res.status(500).send(err);
    }
  })
})

// CREATE load
router.post('/', withAuth, async (req, res, next) => {
  const accessToken = req.header('authorization');

  const load = new loadSchema({
    created_by: accessToken,
    logs: req.body.logs,
    assigned_to: req.body.assigned_to,
    status: req.body.status,
    state: req.body.state,
    dimensions: req.body.dimensions,
    payload: req.body.payload
  });

  try {
    const value = await loadValidation.validateAsync(load._doc);
    const savedLoad = await load.save();
    // res.send({id: load._id, payload: load.payload, dimensions: load.dimensions});
    res.send({ status: "Load created successfully", load})

  } catch(err) {
    res.status(500).send(err);
  }
});

// POST a load
router.put('/:id/post', withAuth, (req, res, next) => {

  loadSchema.findById(req.params.id, (err, loadSchema) => {
    if (!loadSchema) {
      res.status(404).send("load is not found");
    }

    if (loadSchema.status = "NEW") {
      loadSchema.status = req.body.status;
    } else {
      res.status(500).send("Only loads with status \"NEW\" can be posted.")
    }

    try {
      const updatedLoad = loadSchema.save();
      res.status(200).json({ status: "Load posted successfully",
                            assigned_to: loadSchema.assigned_to
                          });

    } catch(err) {
      res.status(500).send({status: "No drivers found"});
    }
  })
})

// READ assigned to driver load info
router.get('/', withAuth, (req, res, next) => {
  const accessToken = req.header('authorization');
  loadSchema.find({ assigned_to: accessToken }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json({ 
        status: "Success",
        loads: data })
    }
  })
});

// READ single shipper loads
router.get('/', withAuth, (req, res, next) => {
  const accessToken = req.header('authorization');
  loadSchema.find({ created_by: accessToken }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json({ 
        status: "Success",
        loads: data })
    }
  })
});

//stopped to work after last change with apidoc
// Search truck for load with status "POSTED" and change status to "OL", load - "ASSIGNED"
router.put('/find/truck', async (req, res) => {
  const load = await loadSchema.findOne({ status: "POSTED" });
  const truck = await truckSchema.findOne({ status: "IS" }).$where('this.assigned_to.length > 4');

  if (load == null ) {
    res.status(400).send("The is no posted load.")
  }

  if (truck == null ) {
    res.status(400).send("The is no truck in service.")
  } else {
    let loadPayload = Object.entries({load: load.payload})[0][1];

    let sizes = Object.entries({load: load.dimensions})[0][1];
    let loadWidth = Object.entries(sizes)[0][1];
    let loadLength = Object.entries(sizes)[1][1];
    let loadHeight = Object.entries(sizes)[2][1];

    let truckType = Object.entries({truck: truck.type})[0][1];
    console.log(truckType);

    if (truckType == "Sprinter") {
      let truckLength = 300;
      let truckHeight = 250;
      let truckWidth = 170;
      let truckPayload = 1700;

      if (loadWidth < truckWidth 
          && loadLength < truckLength 
          && loadHeight < truckHeight
          && loadPayload < truckPayload) {
            try {
              load.status = "ASSIGNED";
              load.state = "En route to Pick Up";
              load.assigned_to = truck._id;
              load.logs = { time: new Date};
              truck.status = "OL";
              truck.save();
              load.save();
              res.json({load, truck});
            } catch(err) {
              res.status(500).send(err);
            }
      }
    } else if (truckType == "Small Straight") {
      let truckLength = 500;
      let truckHeight = 250;
      let truckWidth = 170;
      let truckPayload = 2500;

      if (loadWidth < truckWidth 
        && loadLength < truckLength 
        && loadHeight < truckHeight
        && loadPayload < truckPayload) {
          try {
            load.status = "ASSIGNED";
            load.state = "En route to Pick Up";
            load.assigned_to = truck._id;
            load.logs = { time: new Date};
            truck.status = "OL";
            truck.save();
            load.save();
            res.json({load, truck});
          } catch(err) {
            res.status(500).send(err);
          }
      }
    } else if (truckType == "Large Straight") {
      let truckLength = 700;
      let truckHeight = 350;
      let truckWidth = 200;
      let truckPayload = 4000;

      if (loadWidth < truckWidth 
        && loadLength < truckLength 
        && loadHeight < truckHeight
        && loadPayload < truckPayload) {
          try {
            load.status = "ASSIGNED";
            load.state = "En route to Pick Up";
            load.assigned_to = truck._id;
            load.logs = { time: new Date};
            truck.status = "OL";
            truck.save();
            load.save();
            res.json({load, truck});
          } catch(err) {
            res.status(500).send(err);
          }
      } 
    }
  }
})

// delivered load change status to "SHIPPED", id - asssigned_to
router.put('/finish/:id', async (req, res) => {
  const load = await loadSchema.findOne({ state: "Arrived to delivery" });
  const truck = await truckSchema.findById(req.params.id);

  try {
    load.status = "SHIPPED";
    truck.status = "IS";
    truck.save();
    load.save();
    res.json({load, truck});
  } catch(err) {
    res.status(500).send(err);
  }
})

module.exports = router;