var express = require('express');
var router = express.Router();
const user = require("../sql/user");



router.get('/', function (req, res, next) {
    res.render('login')
});

router.post('/in', (req, res, next) => {
    console.log(req.body);
    user.findOne(req.body, (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log(data);
        if (data) {
            // res.cookie('islogin', 'ok')
            req.session.islogin = 'ok'
            res.redirect('/pro')
        } else {
            res.redirect('/register')
        }
    })
})


module.exports = router;