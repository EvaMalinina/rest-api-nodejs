let express = require('express');
    mongoose = require('mongoose');
    cors = require('cors');
    bodyParser = require('body-parser');
    dbConfig = require('config');
    db = dbConfig.get('db');

// Express Route
const userRoute = require('./routes/user.route');
      driverRoute = require('./routes/driver.route');
      shipperRoute = require('./routes/shipper.route');
      loadRoute = require('./routes/load.route');
      pswResetRoute = require('./routes/pswreset.route');
      imgRoute = require('./routes/images.route');

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Database sucessfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)

const app = express();
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/auth', userRoute);
app.use('/api/trucks', driverRoute);
app.use('/api/shipper', shipperRoute);
app.use('/api/loads', loadRoute);
app.use('/api/resetpassword', pswResetRoute);
app.use('/api/user/image', imgRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});