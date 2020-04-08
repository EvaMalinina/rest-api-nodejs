require('dotenv').config();

const express = require('express'),
  router = express.Router();
  jwt = require('jsonwebtoken');
  bcrypt = require('bcrypt');
  saltRounds = 9;
  withAuth = require('../middleware');
  crypto = require('crypto');
  nodemailer = require('nodemailer');

  pswValidation = require('../validation/psw.validation');
  emailValidation = require('../validation/email.validation');

// User Model
let userSchema = require('../models/User');

// ResetPassword
router.post('/:id',  (req, res) => {
  // const value = await emailValidation.validateAsync(req.body.email);
  if (!req.body.email) {
    return res.status(500).json({ message: 'Email is required' });
  }

  userSchema.findOne({ email:req.body.email })
  .then((user) => {
    if (user === null) {
      console.error('email not in database');
      res.status(403).send('email not in db');
    } else {
      let token = crypto.randomBytes(16).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000;
      user.save();

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });

      const mailOptions = {
        from: 'eva.malininaa@gmail.com',
        to: `${user.email}`,
        subject: 'Link To Reset Password',
        text:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
          + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
          + `http://localhost:4000/api/resetpassword/auth/${token}\n\n`
          + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      };

      console.log('sending mail');

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log('here is the res: ', response);
          res.status(200).json('recovery email sent');
        }
      });
    }
  })
  .catch((err) => {
    return res.status(500).send({ msg: err.message });
  });
})

// check token
router.get('/auth/:token', (req, res) => {
  userSchema.findOne({
    resetPasswordToken: req.params.token,
    // resetPasswordToken: req.query.resetPasswordToken,
    //   resetPasswordExpires: {
    //     $gt: Date.now(),
    //   }
    },
  ).then((user) => {
    console.log('get api', user);
    if (user == null) {
      console.error('password reset link is invalid or has expired');
      res.status(401).send('password reset link is invalid or has expired');
    } else {
      res.status(200).send({
        name: user.name,
        message: 'password reset link a-ok',
      });
    }
  });
});

//validate token and submit new password
router.put('/submit/:id', (req, res) => {
  userSchema.findOne({
      "name": req.body.name,
      "resetPasswordToken": req.body.resetPasswordToken,
      "resetPasswordExpires": {
        $gt: Date.now(),
      }
  }).then(user => {
    if (user == null) {
      console.error('password reset link is invalid or has expired');
      res.status(403).send('password reset link is invalid or has expired');
    } else if (user != null) {
      console.log('user exists in db');
      bcrypt
        .hash(req.body.password, saltRounds)
        .then(hashedPassword => {
          user.update({
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
          });
        })
        .then(() => {
          console.log('password updated');
          res.status(200).send({ message: 'password updated' });
        });
    } else {
      console.error('no user exists in db to update');
      res.status(401).json('no user exists in db to update');
    }
  });
});

module.exports = router;