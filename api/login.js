var express = require('express');
var router = express.Router();
var AuserModel = require('../models/auser');

router.route('/login')
    .get(function (req, res, next) {
        res.render('admin/login');
    })
    .post(function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        var verify = req.body.verify;

        var auserQuery = AuserModel.Auser.find({});
        auserQuery.exec(function (err, ausers) {
            ausers.forEach(function (auser, index) {
                console.log(auser.name)
            })
        })
        res.json(200, {"word": "hello"});
    })


module.exports = router;