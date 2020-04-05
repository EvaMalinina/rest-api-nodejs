require('dotenv').config();

const express = require('express'),
      router = express.Router();
      multer = require('multer');

// Image Model
let imgSchema = require('../models/Image');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
 
  if( file.mimetype === "image/jpeg" || file.mimetype ===  "image/png") {
    // store file
    cb(null, true)
  } else {
    // refuse store file
    // cb(null, false)
    cb(new Error('The file format only .jpg/.png'))
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
}) 

// store img in uploads folder
router.post('/:id', upload.single('imageData'), async (req, res, next) => {

  console.log('body', req.body);
  const newImage = new imgSchema({
    imageName: req.body.imageName,
    imageData: req.file.path
  });

  newImage.save()
    .then((result) => {
      console.log("result", result);
      res.status(200).json({
        success: true,
        document: result
      });
    })
    .catch((err) => next(err));
})

module.exports = router;