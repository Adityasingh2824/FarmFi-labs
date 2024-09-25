import React from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faHandshake, faLaptopCode } from '@fortawesome/free-solid-svg-icons';

const About = () => {
    return (
        <div className="about">
            {/* Mission Section */}
            <section className="about-mission">
                <div className="icon-wrapper">
                    <FontAwesomeIcon icon={faSeedling} className="mission-icon" />
                </div>
                <h2>Our Mission</h2>
                <p>
                    At FarmFi Labs, we are dedicated to revolutionizing agriculture with blockchain technology. Our mission is to empower farmers, merchants, and investors with a transparent, secure, and efficient platform for managing and trading grain assets globally.
                </p>
            </section>

            {/* Platform Section */}
            <section className="about-platform">
                <div className="icon-wrapper">
                    <FontAwesomeIcon icon={faHandshake} className="platform-icon" />
                </div>
                <h2>About the Platform</h2>
                <p>
                    FarmFi Labs brings the agricultural industry into the digital age. By tokenizing grain assets, we offer transparency and liquidity to the market. Using smart contracts, oracle integrations, and Proof of Grain Reserve (PoGR), we ensure that every token is backed by real-world grain, securing trust and financial stability.
                </p>
            </section>

            {/* Technology Section */}
            <section className="about-technology">
                <div className="icon-wrapper">
                    <FontAwesomeIcon icon={faLaptopCode} className="technology-icon" />
                </div>
                <h2>The Technology Behind FarmFi Labs</h2>
                <p>
                    Built on the Aptos blockchain, FarmFi Labs leverages the speed, security, and scalability of decentralized technologies. Our smart contracts allow seamless grain tokenization and secure transactions. Through oracle integrations, we provide real-time data, ensuring that every token is accurately backed by real grain reserves.
                </p>
            </section>

            {/* Team Section */}
            <section className="about-team">
                <h2>Meet the Team</h2>
                <div className="team-grid">
                    <div className="team-member">
                        <img src="/assets/images/team-member1.jpg" alt="Aditya Singh" />
                        <h3>Aditya Singh</h3>
                        <p>Founder & CEO</p>
                    </div>
                    <div className="team-member">
                        <img src="/assets/images/team-member2.jpg" alt="Manav Goyal" />
                        <h3>Manav Goyal</h3>
                        <p>Founder & CTO</p>
                    </div>
                    <div className="team-member">
                        <img src="/assets/images/team-member3.jpg" alt="Yash Karakoti" />
                        <h3>Yash Karakoti</h3>
                        <p>Founder & Head of Blockchain Development</p>
                    </div>
                    <div className="team-member">
                        <img src="/assets/images/team-member4.jpg" alt="Aayush Jha" />
                        <h3>Aayush Jha</h3>
                        <p>Founder & Lead Developer</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
