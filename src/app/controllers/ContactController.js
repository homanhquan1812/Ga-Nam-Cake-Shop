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
                '/css/main.css'
            ],
            scripts: [
                '/js/jquery.countup.min.js',
                '/js/lightbox.min.js',
                '/js/isotope.pkgd.min.js',
                '/js/owl.carousel.min.js',
                '/js/util.js',
                '/js/main-backtotop.js',
                '/js/main.js',
                'js/script.js'
            ],
            csw_name
        })
    }
}

module.exports = new ContactController