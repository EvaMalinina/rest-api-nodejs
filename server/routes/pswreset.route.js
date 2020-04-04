require('dotenv').config();

const express = require('express'),
  router = express.Router();
  jwt = require('jsonwebtoken');
  bcrypt = require('bcrypt');
  saltRounds = 9;
  withAuth = require('../middleware');
  crypto = require('crypto');
  nodemailer = require('nodemailer');
  passwordResetToken = require('../models/ResetToken');

  pswValidation = require('../validation/psw.validation');
  emailValidation = require('../validation/email.validation');

// User Model
let userSchema = require('../models/User');


// ResetPassword
router.put('/:id', async (req, res, next) => {

  // const value = await emailValidation.validateAsync(req.body.email);

  if (!req.body.email) {
    return res.status(500).json({ message: 'Email is required' });
  }
  
  const user = await userSchema.findOne({ email:req.body.email });
  if (!user) {
    return res.status(405).json({ message: 'Email does not exist' });
  }

  let resettoken = new passwordResetToken({ _userId: user._id, resettoken: crypto.randomBytes(16).toString('hex') });
  resettoken.save(function (err) {
    if (err) { 
      return res.status(500).send({ msg: err.message });
    }

    passwordResetToken.find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();
    // res.status(200).json({ message: 'Reset Password successfully.' });
    res.status(200).json({ resettoken });

    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      port: 465,
      auth: {
        user: 'user',
        pass: 'password'
      }
    });

    let mailOptions = {
      to: user.email,
      from: 'testapp@gmail.com',
      subject: 'Password Reset',
      text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://localhost:3000/response/resetpassword/' + resettoken.resettoken + '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    }
    transporter.sendMail(mailOptions, (err, info) => {
    })
  })
})

//validate token and submit new password
router.put('/submit/:id', async (req, res, next) => {

  if (!req.body.resettoken) {
    return res.status(500).json({ message: 'Token is required' });
  }
  const user = await passwordResetToken.findOne({ 
    resettoken: req.body.resettoken
  });
  if (!user) {
    return res.status(405).json({ message: 'Invalid URL' });
  }

  userSchema.findOneAndUpdate({ id: user._userId })
    .then(() => {
      // res.status(200).json({ message: 'Token verified successfully.' });
      //NewPassword
      passwordResetToken.findOne({ resettoken: req.body.resettoken }, function (err, userToken, next) {
        if (!userToken) {
          return res.status(405).json({ message: 'Token has expired' });
        }

        userSchema.findOne({ _id: userToken._userId }, async function (err, userEmail, next) {
          if (!userEmail) {
            return res.status(405).json({ message: 'User does not exist' });
          }
          // const value = pswValidation.validateAsync(req.body.newPassword);

          return bcrypt.hash(req.body.newPassword, saltRounds, (err, hash) => {
            if (err) {
              return res.status(400).json({ message: 'Error hashing password' });
            }

            userEmail.password = hash;
            userEmail.save(function (err) {
              if (err) {
                return res.status(400).json({ message: 'Password can not reset.' });
              } else {
                userToken.remove();
                return res.status(201).json({ message: 'Password reset successfully' });
              }
            });
          });
        });
      })
    })
    .catch((err) => {
      return res.status(500).send({ msg: err.message });
    });
})

module.exports = router;