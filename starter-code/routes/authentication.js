const express    = require('express');
const passport   = require('passport');
const router     = express.Router();
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const uploadCloud = require('../config/cloudinary.js');
const User = require('../models/user')


router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', { message: req.flash('error')});
});

// router.post('/signup', ensureLoggedOut(),uploadCloud.single('photo'),(req,res, next) =>{
//     const { username, email, password } = req.body;
//   const photoUrl = req.file.url;
//   const photoName = req.file.originalname;
//   const newUser = new User({username, email, password, photoUrl,photoName});
//   newUser.save()
//   .then(newUser => {
//     res.redirect('/login');
//   })
//   .catch(error => {
//     console.log(error);
//   })
// });

router.post('/signup', ensureLoggedOut(),uploadCloud.single('photo'), passport.authenticate('local-signup',
{successRedirect : '/',
failureRedirect : '/login',
failureFlash : true}), (req,res) => {
})

router.get('/profile', ensureLoggedIn('/login'), (req, res) => {
    res.render('authentication/profile', {
        user : req.user
    });
});

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
