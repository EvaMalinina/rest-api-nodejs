let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
  jwt = require('jsonwebtoken');
  bcrypt = require('bcrypt');
  saltRounds = 20;

  id = 100;
  id++;

// driver Model
let driverSchema = require('../models/Driver');

// CREATE Drivers
router.post(`/${id}`, async (req, res, next) => {
  await driverSchema.create(req.body, async (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      
      // to hash pass
      const salt = await bcrypt.genSalt(20);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const driver = new driverSchema({
          name: req.body.name,
          email: req.body.email,
          tel: req.body.tel,
          password: hashedPassword,
          type: req.body.type,
      });
      try {
          const savedDriver = driver.save();
          res.send({driver: driver._id});
      }catch(err){
          res.status(400).send(err);
      }
    }
  })
});


router.post(`/${id}/login`, async (req, res) => {

  const driver = await driverSchema.findOne({email: req.body.email});
    if(!driver) {
      return res.status(400).send("There is no user such email.");
    }

  const validPass = await bcrypt.compare(req.body.password, driver.password);
    if(!validPass) {
      return res.status(400).send("Wrong password!");
    }

  // token
  const token = jwt.sign({_id: driver._id}, process.env.TOKEN_SECRET);
  res.header('authorization', token).send(token);
});


// READ Drivers
router.route('/').get((req, res) => {
  driverSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single driver
router.route('/:id').get((req, res) => {
  driverSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update driver
router.route('/:id').put((req, res, next) => {
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
router.route('/:id').delete((req, res, next) => {
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