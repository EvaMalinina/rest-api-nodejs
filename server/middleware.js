const jwt = require('jsonwebtoken');

const withAuth = function (req, res, next){
    const token = req.header('authorization');
    if(!token) return res.status(401).send("Access Denied");

    try{
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.driver = verified;
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
//   const driver = driverSchema.findOne({email: req.body.email})
//   if (token == null) return res.sendStatus(401)

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, driver) => {
//     if (err) return res.sendStatus(403)
//     req.driver = driver
//     next()
//   })
// }