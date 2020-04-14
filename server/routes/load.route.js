const express = require('express'),
      router = express.Router();

// Models
let loadSchema = require('../models/Load');
let truckSchema = require('../models/Truck');

// Search truck for load with status "POSTED" and change status to "OL", load - "ASSIGNED"
router.put('/', async (req, res) => {
  const load = await loadSchema.findOne({ status: "POSTED" });
  const truck = await truckSchema.findOne({ status: "IS"}).$where('this.assigned_to.length > 4');

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

    // console.log(truckStatus, loadStatus);
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
    // res.json({load,  truck})
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