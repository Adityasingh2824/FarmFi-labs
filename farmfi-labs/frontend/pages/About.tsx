import React from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faHandshake, faLaptopCode } from '@fortawesome/free-solid-svg-icons';

// Define an interface for the team member details
interface TeamMember {
    name: string;
    role: string;
    image: string;
}

// Define a component
const About: React.FC = () => {
    // List of team members
    const teamMembers: TeamMember[] = [
        { name: 'Aditya Singh', role: 'Founder & CEO', image: '/assets/images/team-member1.jpg' },
        { name: 'Manav Goyal', role: 'Founder & CTO', image: '/assets/images/team-member2.jpg' },
        { name: 'Yash Karakoti', role: 'Founder & Head of Blockchain Development', image: '/assets/images/team-member3.jpg' },
        { name: 'Aayush Jha', role: 'Founder & Lead Developer', image: '/assets/images/team-member4.jpg' },
    ];

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
                    {teamMembers.map((member) => (
                        <div className="team-member" key={member.name}>
                            <img src={member.image} alt={member.name} />
                            <h3>{member.name}</h3>
                            <p>{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;