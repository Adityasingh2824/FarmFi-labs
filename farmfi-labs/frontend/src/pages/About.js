import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about">
            <section className="about-mission">
                <h2>Our Mission</h2>
                <p>
                    At FarmFi Labs, our mission is to revolutionize the agricultural industry through blockchain technology. 
                    We aim to empower farmers, merchants, and investors by providing a transparent, secure, and efficient platform 
                    for managing and trading grain assets.
                </p>
            </section>

            <section className="about-platform">
                <h2>About the Platform</h2>
                <p>
                    FarmFi Labs leverages the power of blockchain to tokenize grain assets, providing a new level of transparency and 
                    liquidity in the agricultural sector. Our platform uses advanced smart contracts, oracle integrations, and Proof of Grain Reserve (PoGR) 
                    to ensure that every token is backed by real-world assets. By bringing agriculture into the digital age, we are creating new opportunities 
                    for financial growth and stability.
                </p>
            </section>

            <section className="about-technology">
                <h2>The Technology Behind FarmFi Labs</h2>
                <p>
                    Our platform is built on the Aptos blockchain, known for its security, scalability, and speed. Using smart contracts, 
                    we tokenize grain assets, allowing for secure and efficient trading. Oracle integrations provide real-time data feeds, 
                    ensuring accurate and up-to-date information on grain reserves and market prices. Our Proof of Grain Reserve (PoGR) system 
                    guarantees that each token is backed by actual grain, providing a secure and transparent ecosystem for all participants.
                </p>
            </section>

            <section className="about-team">
                <h2>Meet the Team</h2>
                <div className="team-grid">
                    <div className="team-member">
                        <img src="/assets/images/team-member1.jpg" alt="Team Member 1" />
                        <h3>John Smith</h3>
                        <p>Founder & CEO</p>
                    </div>
                    <div className="team-member">
                        <img src="/assets/images/team-member2.jpg" alt="Team Member 2" />
                        <h3>Jane Doe</h3>
                        <p>CTO</p>
                    </div>
                    <div className="team-member">
                        <img src="/assets/images/team-member3.jpg" alt="Team Member 3" />
                        <h3>Emily Johnson</h3>
                        <p>Head of Blockchain Development</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
