import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header: React.FC = () => {
    const [menuOpen, setMenuOpen] = React.useState<boolean>(false); // Explicitly typing the state
    
    const toggleMenu = () => {
        setMenuOpen((prevMenuOpen) => !prevMenuOpen);
    };

    return (
        <header className="header">
            <div className="header-container">
                <nav className={`nav ${menuOpen ? 'active' : ''}`}>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/solutions">Solutions</Link></li>
                        <li><Link to="/marketplace">MarketPlace</Link></li>
                        <li><Link to="/how-it-works">How It Works</Link></li>
                        <li><Link to="/farmers">Farmers</Link></li>
                        <li><Link to="/merchants">Merchants</Link></li>
                        <li><Link to="/grain-holders">Grain Holders</Link></li>
                        <li><Link to="/tokenization">Tokenization</Link></li>
                    </ul>
                </nav>
                <div className="header-actions">
                    <button className="login-btn">
                        <Link to="/login">Log in</Link>
                    </button>
                    <button className="menu-toggle" onClick={toggleMenu}>
                        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                    </button>
                </div>
            </div>
            
        </header>
    );
};

export default Header;
