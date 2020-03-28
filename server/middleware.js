const jwt = require('jsonwebtoken');

const withAuth = function (req, res, next){
   
    try{
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]

      if(!token) return res.status(401).send("Access Denied");
      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = verified;
      next();
    }catch(err){
      res.status(400).send("Invalid Token!");
    }
}
module.exports = withAuth;

// const jwt = require('jsonwebtoken');

// const withAuth = function(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//   const user = userSchema.findOne({email: req.body.email})
//   if (token == null) return res.sendStatus(401)

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403)
//     req.user = user
//     next()
//   })
// }