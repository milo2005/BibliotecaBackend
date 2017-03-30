var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
  req.collection = req.db.collection("users");
  next();
});

router.post("/signin", (req, res, next) => {

  let user = req.body;

  req.collection.findOne({ username: user.username }).then(doc => {
    if (doc) {
      res.send({ success: false, exist: true });
    } else {
      req.collection.insert(req.body).then(result => {
        res.send({ success: true });
      }).catch(err => {
        res.send({ success: false });
      });
    }
  }).catch(err => {
    res.send({ success: false });
  });


});

router.post("/login", (req, res, next) => {
  let body = req.body;
  req.collection.findOne({ username: body.username, password: body.password }).then(doc => {
    if(doc){
      res.send({ success: true, user: doc });
    }else{
      res.send({ success: false });
    }    
  }).catch(err => {
    res.send({ success: false });
  });
});

module.exports = router;
