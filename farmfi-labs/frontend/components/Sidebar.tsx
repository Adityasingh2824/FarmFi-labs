import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faSeedling, faUser, faShoppingCart, faClipboardList, faCog, faBars,
  faBaby, faMoneyBill, faClock, faQuestionCircle, faStore, faPlusCircle
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Handle hover to open the sidebar
    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div 
                className={`sidebar ${isOpen ? 'open' : 'closed'}`} 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
            >
                <div className="sidebar-logo">
                    <h2>FarmFi Labs</h2>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><Link to="/dashboard"><FontAwesomeIcon icon={faHome} /> <span>Dashboard</span></Link></li>
                        <li><Link to="/farmers"><FontAwesomeIcon icon={faUser} /> <span>Farmer Profiles</span></Link></li>
                        <li><Link to="/merchants"><FontAwesomeIcon icon={faShoppingCart} /> <span>Merchant Profiles</span></Link></li>
                        <li><Link to="/oracle-integration"><FontAwesomeIcon icon={faClock} /> <span>Real Time Grain Prices</span></Link></li>
                        <li><Link to="/farmer-submission"><FontAwesomeIcon icon={faPlusCircle} /> <span>Submit Crop (Farmer)</span></Link></li>
                        <li><Link to="/orders"><FontAwesomeIcon icon={faClipboardList} /> <span>Orders</span></Link></li>
                        <li><Link to="/products"><FontAwesomeIcon icon={faStore} /> <span>Products</span></Link></li>
                        <li><Link to="/financial-institutions"><FontAwesomeIcon icon={faMoneyBill} /> <span>Financial Institutions</span></Link></li>
                        <li><Link to="/enterprise"><FontAwesomeIcon icon={faBaby} /> <span>Enterprise</span></Link></li>
                        <li><Link to="/about"><FontAwesomeIcon icon={faQuestionCircle} /> <span>About Us</span></Link></li>
                        <li><Link to="/settings"><FontAwesomeIcon icon={faCog} /> <span>Settings</span></Link></li>
                    </ul>
                </nav>
            </div>
            
        </>
    );
};

export default Sidebar;
