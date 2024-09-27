import React from 'react'; 
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faLinkedin, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* About Section */}
                <div className="footer-about">
                    <h2>FarmFi Labs</h2>
                    <p>
                        Empowering the agricultural revolution through blockchain technology. Tokenize, trade, and manage grain assets seamlessly with transparency and security.
                    </p>
                    <p className="footer-newsletter">
                        Subscribe to our newsletter to stay updated:
                    </p>
                    <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Your email address" required />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>

                {/* Quick Links Section */}
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/solutions">Solutions</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/news">Agrotech News</Link></li>
                        <li><Link to="/contact-us">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Social Media Links */}
                <div className="footer-social">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="footer-bottom">
                <p>&copy; 2024 FarmFi Labs. All rights reserved.</p>
                <div className="footer-policy-links">
                    <Link to="/terms">Terms and Conditions</Link>
                    <Link to="/privacy">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
