/*
csw_name: { type: String, maxLength: 255, required: true },
csw_gender: { type: String, maxLength: 255, required: true},
csw_phonenumber: { type: String, maxLength: 255, required: true },
csw_username: { type: String, maxLength: 255, required: true },
csw_emailaddress: { type: String, maxLength: 255, required: true },
csw_password: { type: String, maxLength: 255, required: true },
*/
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const Customers = require('../models/Customers');
const Staffs = require('../models/Staffs')
class LoginController
{
    index(req, res)
    {
        res.render('login', {
            styles: ['/css/loginStyle.css']
        })
    };

    async login(req, res) 
    {
        const {username, password, fullname} = req.body;

        try {
            const customer = await Customers.findOne({csw_username: username});
            const staff = await Staffs.findOne({csw_username: username})
            if (!customer && !staff) {
                return res.redirect('/login?error=usr');
            }
            //handles customer login
            if (customer) {
                const isMatch = (customer.csw_password === password);
                if (!isMatch) {
                    return res.redirect('/login?error=pwd');
                }
                req.session.username = customer.csw_username;
                console.log("Customer logged in");
                console.log("Username = " + customer.csw_username + "\nPassword = " + customer.csw_password);
                return res.redirect('/home');
            }
            //handles staff login
            else if (staff) {
                const isMatch = (staff.csw_password === password); 
                if (!isMatch) {
                    return res.redirect('/login?error=pwd');
                }
                req.session.username = staff.csw_username;
                req.session.role = staff.csw_position;
                
                if (req.session.role === "Manager") {
                    console.log("Manager logged in");
                    console.log("Username = " + staff.csw_username + "\nPassword = " + staff.csw_password);
                    req.session.csw_name = staff.csw_name;
                    req.session.csw_position = staff.csw_position;
                    return res.redirect('/managers');           
                }

                if (req.session.role === "Employee") {
                    console.log("Employee logged in");
                    console.log("Username = " + staff.csw_username + "\nPassword = " + staff.csw_password);
                    req.session.csw_name = staff.csw_name;
                    req.session.csw_position = staff.csw_position;
                    return res.redirect('/employees');
                }
            }
            else {
                console.log("Login error - not customer or staff");
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error logging in' });
        }
    }
    async register(req, res) {
        try {
            const userCheck = await Customers.findOne({csw_username: req.body.user});
            if (userCheck) {
                //username already exists in database
                return res.redirect('/login?error=reg')
            }
            const userData = {
                csw_name: req.body.fullname,
                csw_gender: req.body.gender,
                csw_phonenumber: req.body.phonenumber,
                csw_address: req.body.address,
                csw_username: req.body.user,
                csw_emailaddress: req.body.email,
                csw_password: req.body.pass
            }
            console.log("userData:" + JSON.stringify(userData));
            Customers.create(userData, function(err) {
                if (err) return next(err)
                else return res.redirect('/login');
            })
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error registering account'});
        }
    }
}

module.exports = new LoginController