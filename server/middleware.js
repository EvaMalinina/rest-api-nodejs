const jwt = require('jsonwebtoken');

const withAuth = function (req, res, next){
      const accessToken = req.header('authorization');
      if(!accessToken) return res.status(401).send("Access Denied");

    try{
      const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = verified;
      next();
    } catch(err) {
      res.status(400).send("Invalid Token!");
    }
}
module.exports = withAuth;