class LoginController
{
    index(req, res)
    {
        res.render('login', {
            styles: ['/css/loginStyle.css']
        })
    }
}

module.exports = new LoginController