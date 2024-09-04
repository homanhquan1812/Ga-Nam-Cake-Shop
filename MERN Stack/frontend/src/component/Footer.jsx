import React from 'react'

export const Footer = () => {
  return (
    <div>
        <footer>
            <div className="footer__main row">
                <div className="footer__item col-3">
                <h3>About Us</h3>
                <p>Welcome to your neighborhood bakery café.</p>
                <p>Where smiles are served daily
                    Enjoy delicious pastries, warm breads, stunning cakes and expertly brewed drinks while feeling right at home.</p>
                <div className="footer__social">
                    <i className="fab fa-facebook-f" />
                    <i className="fab fa-google-plus-g" />
                    <i className="fab fa-twitter" />
                </div>
                </div>
                <div className="footer__item col-3">
                <h3>Working Time</h3>
                <div className="footer__time">
                    <p>Monday</p>
                    <p>9h30 - 18h30</p>
                </div>
                <div className="footer__time">
                    <p>Tuesday</p>
                    <p>9h30 - 18h30</p>
                </div>
                <div className="footer__time">
                    <p>Wednesday</p>
                    <p>9h30 - 18h30</p>
                </div>
                <div className="footer__time">
                    <p>Thursday</p>
                    <p>9h30 - 18h30</p>
                </div>
                <div className="footer__time">
                    <p>Friday</p>
                    <p>9h30 - 18h30</p>
                </div>
                <div className="footer__time">
                    <p>Saturday</p>
                    <p>9h30 - 18h30</p>
                </div>
                <div className="footer__time">
                    <p>Sunday</p>
                    <p>9h30 - 18h30</p>
                </div>
                </div>
                <div className="footer__item col-3">
                <h3>Twitter Us</h3>
                <p>Masters at Work</p>
                <p>Community is at our Core</p>
                <p>Happy to see you. </p>
                <p>Happier to serve you.</p>
                </div>
                <div className="footer__item col-3">
                <h3>SUBSCRIBE US</h3>
                <form className="footer__sub">
                    <input type="email" name id placeholder="name@example" />
                    <button className="button-pink" type="submit">Send</button>
                </form>
                <p>Thank you for your interest in reaching out to us! Fill out the feedback form and a member of our team will be in touch soon.</p>
                </div>
            </div>
            <div className="footer__copyright">
                <p> Copyright © 2024 <span>Gà Nấm Cake Shop</span>. All rights reserved.</p>
            </div>
        </footer>
    </div>
  )
}