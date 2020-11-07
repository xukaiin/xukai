var express = require('express');
var router = express.Router();
var uuid = require("node-uuid");
const user = require("../sql/user");
/* GET home page. */
router.get('/', function (req, res, next) {
  user.find({}, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.render('user', {
      index: 2,
      data: data
    })
  })
});

router.get("/add", function (req, res, next) {
  res.render("userAdd", {
    index: 2,
  });
});

router.post('/addAction', (req, res, next) => {
  const obj = req.body;
  obj.username = obj.username + '';
  obj.password = obj.password + '';
  user.insertMany(obj, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/user");
  })
})

router.get("/update", function (req, res, next) {
  const _id = req.query._id;
  console.log("_id", _id);
  user.findById({ "_id": _id }, (err, data) => {
    if (err) {
      console.log(err)
    }
    res.render('userUpdate', {
      index: 2,
      data: data
    })
  })
})

router.post("/updateAction", function (req, res, next) {
  const obj = req.body;
  console.log(obj);
  console.log(obj._id);
  obj.username = obj.username + '';
  obj.password = obj.password + '';
  user.findByIdAndUpdate(obj._id, obj, (err, data) => {
    if (err) {
      console.log(err)
    }
    res.redirect("/user");

  })

});

router.get("/delete", function (req, res, next) {
  user.deleteOne({ '_id': req.query._id }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.redirect("/user");
  })
})


router.get("/search", (req, res, next) => {
  const obj = req.query;
  let reg = new RegExp(obj.search);
  user.find({ username: reg }, (err, data) => {
    if (err) {
      console.log(err)
    }
    console.log(data)
    res.render("user", {
      index: 2,
      data,
    });
  })


});
module.exports = router;
