const Feedbacks = require('../models/Feedbacks')

class ContactController
{
    index(req, res)
    {
        const csw_name = req.session.username
        res.render('contact', {
            isLoggedIn: req.session.username ? true : false,
            username: req.session.username,
            styles: [
                '/css/lightbox.min.css',
                '/css/owl.carousel.min.css',
                '/css/owl.theme.default.min.css',
                '/css/main.css',
                '/css/linea-icon.css',
                '/css/lightbox.min.css'
            ],
            scripts: [
                '/js/jquery.countup.min.js',
                '/js/lightbox.min.js',
                '/js/isotope.pkgd.min.js',
                '/js/owl.carousel.min.js',
                '/js/util.js',
                '/js/main-backtotop.js',
                '/js/main.js',
                '/js/script.js'
            ],
            csw_name
        })
    }

    store(req, res, next)
    {
        const formData = req.body      
        const newInfo = new Feedbacks(formData)
        newInfo.save()
            .then(() => res.redirect('/home'))
            .catch(next)
    }
}

module.exports = new ContactController