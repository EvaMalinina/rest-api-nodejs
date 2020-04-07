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
//async
router.post('/:id',  (req, res) => {

  // const value = await emailValidation.validateAsync(req.body.email);

  if (!req.body.email) {
    return res.status(500).json({ message: 'Email is required' });
  }
  console.error(req.body.email);
  
  // const user = await 
  userSchema.findOne({ email:req.body.email })
  // if (!user) {
  //   return res.status(405).json({ message: 'Email does not exist' });
  // }
  .then((user) => {
    if (user === null) {
      console.error('email not in database');
      res.status(403).send('email not in db');
    } else {
      // let resettoken = new passwordResetToken({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
      let token = crypto.randomBytes(16).toString('hex');
      user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000,
      });

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
          + `http://localhost:3000/api/resetpassword/auth/${token}\n\n`
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
  // resettoken.save(function (err) {
  //   if (err) { 
  //     return res.status(500).send({ msg: err.message });
  //   }

  //   passwordResetToken.find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();
  //   // res.status(200).json({ message: 'Reset Password successfully.' });
  //   res.status(200).json({ resettoken });

  //   let transporter = nodemailer.createTransport({
  //     service: 'Gmail',
  //     port: 465,
  //     auth: {
  //       user: user.email,
  //       pass: user.password
  //     }
  //   });

  //   let mailOptions = {
  //     to: user.email,
  //     from: '<testapp@gmail.com>',
  //     subject: 'Password Reset',
  //     text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
  //     'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
  //     'http://localhost:3000/response/resetpassword/' + resettoken.resettoken + '\n\n' +
  //     'If you did not request this, please ignore this email and your password will remain unchanged.\n'
  //   }
  //   transporter.sendMail(mailOptions, (err, info) => {
  //   })
  // })
})

// check token
router.get('/auth', (req, res) => {
  userSchema.findOne({
     resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    },
  ).then((user) => {
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
router.put('/submit', (req, res) => {
  userSchema.findOne({
    where: {
      name: req.body.name,
      resetPasswordToken: req.body.resetPasswordToken,
      resetPasswordExpires: {
        $gt: Date.now(),
      },
    },
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
// router.put('/submit/:id', async (req, res, next) => {

//   if (!req.body.resettoken) {
//     return res.status(500).json({ message: 'Token is required' });
//   }
//   const user = await passwordResetToken.findOne({ 
//     resettoken: req.body.resettoken
//   });
//   if (!user) {
//     return res.status(405).json({ message: 'Invalid URL' });
//   }

//   userSchema.findOneAndUpdate({ id: user._userId })
//     .then(() => {
//       // res.status(200).json({ message: 'Token verified successfully.' });
//       //NewPassword
//       passwordResetToken.findOne({ resettoken: req.body.resettoken }, function (err, userToken, next) {
//         if (!userToken) {
//           return res.status(405).json({ message: 'Token has expired' });
//         }

//         userSchema.findOne({ _id: userToken._userId }, async function (err, userEmail, next) {
//           if (!userEmail) {
//             return res.status(405).json({ message: 'User does not exist' });
//           }
//           // const value = pswValidation.validateAsync(req.body.newPassword);

//           return bcrypt.hash(req.body.newPassword, saltRounds, (err, hash) => {
//             if (err) {
//               return res.status(400).json({ message: 'Error hashing password' });
//             }

//             userEmail.password = hash;
//             userEmail.save(function (err) {
//               if (err) {
//                 return res.status(400).json({ message: 'Password can not reset.' });
//               } else {
//                 userToken.remove();
//                 return res.status(201).json({ message: 'Password reset successfully' });
//               }
//             });
//           });
//         });
//       })
//     })
//     .catch((err) => {
//       return res.status(500).send({ msg: err.message });
//     });
// })

module.exports = router;