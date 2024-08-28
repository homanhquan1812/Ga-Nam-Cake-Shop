const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    if (req.session) {
        console.log("Session found: " + req.session.username);
        //delete session object
        req.session.destroy(function(err) {
            if (err) return next(err);
            else return res.redirect('/home');
        })
    }
    else console.log("Session not found");
});
module.exports = router;