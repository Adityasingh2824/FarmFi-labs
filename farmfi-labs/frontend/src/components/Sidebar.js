import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSeedling, faUser, faShoppingCart, faClipboardList, faCog, faBars, faBaby, faMoneyBill, faClock } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-logo">
                    <h2>FarmFi Labs</h2>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            <Link to="/dashboard">
                                <FontAwesomeIcon icon={faHome} /> <span>Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/tokenization">
                                <FontAwesomeIcon icon={faSeedling} /> <span>Tokenization</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/farmers">
                                <FontAwesomeIcon icon={faUser} /> <span>Farmer Profiles</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/merchants">
                                <FontAwesomeIcon icon={faShoppingCart} /> <span>Merchant Profiles</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/orders">
                                <FontAwesomeIcon icon={faClipboardList} /> <span>Orders</span>
                            </Link>
                        </li>
                        <li>
                          <Link to="/enterprise"><FontAwesomeIcon icon={faBaby} /><span>Enterprise</span></Link>
                                 
                        </li>
                        <li>
                        <Link to="/financial-institutions"><FontAwesomeIcon icon={faMoneyBill}></FontAwesomeIcon> <span>Financial-institutions</span></Link>
                        </li>
                        <li>
                        <Link to="/oracle-integration"><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> <span> Oracle Integration</span></Link>
                        </li>
                    
                        <li>
                            <Link to="/settings">
                                <FontAwesomeIcon icon={faCog} /> <span>Settings</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};


export default Sidebar;
