var express = require('express');
const { render } = require('../app');
var router = express.Router();
const user = require("../sql/user");



router.get('/', function (req, res, next) {
    res.render('register')
});

router.post('/in', (req, res, next) => {
    let obj = req.body;
    console.log(obj, 1111);
    if (!obj.username || !obj.username) {
        res.redirect('/register');
    } else {
        user.findOne({ username: obj.username }, (err, data) => {
            if (err) {
                console.log(err);
            }
            // console.log(data);
            if (data) {
                // console.log(1111);
                res.redirect('/register')
            } else {
                user.insertMany(req.body, (err, data) => {
                    // console.log(2222); 
                    if (err) {
                        console.log(err);
                    }
                    console.log(data);
                    res.redirect('/login')

                })
            }
        })
    }

})
module.exports = router;