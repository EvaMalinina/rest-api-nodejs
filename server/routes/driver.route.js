require('dotenv').config();

let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
  jwt = require('jsonwebtoken');
  bcrypt = require('bcrypt');
  saltRounds = 9;
  withAuth = require('../middleware');

// driver Model
let driverSchema = require('../models/Driver');

// CREATE Drivers
router.post('/', async (req, res, next) => {
      
    // to hash pass
    const salt = await bcrypt.genSalt(9);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const driver = new driverSchema({
        name: req.body.name,
        email: req.body.email,
        tel: req.body.tel,
        password: hashedPassword,
        role: req.body.role
    });
    try {
        const savedDriver = driver.save();
        res.send({driver: driver._id});
    }catch(err){
        res.status(500).send(err);
    }
});

// LOGIN Drivers
router.post('/login', async (req, res) => {

  const driver = await driverSchema.findOne({email: req.body.email});
 
  if ( driver == null ) {
    return res.status(400).send("Cannot find a user.")
  }
  try {
    if(await bcrypt.compare(req.body.password, driver.password)) {
      // res.send("You are logged in.")
      // token
      const accessToken = jwt.sign({_id: driver._id}, process.env.ACCESS_TOKEN_SECRET);
      // res.send({ accessToken: accessToken });
      res.header('authorization', accessToken).send(accessToken);
    } else {
      res.send("Credentials are not correct.")
    }
  } catch {
    res.status(500).send();
  }
});


// READ Drivers
router.get('/', (req, res) => {
  driverSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single driver
router.get('/:id', withAuth, (req, res) => {
  // res.send(drivers.filter(driver => driver.email = req.driver.email));
  const driver = driverSchema.findOne({email: req.body.email});
  if (req.body.email = driver.email) {
    res.send(driver);
  };
 
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