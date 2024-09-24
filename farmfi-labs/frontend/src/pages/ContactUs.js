import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    // Handle form input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Validate form before submission
    const validateForm = () => {
        let formErrors = {};
        if (!formData.name) formErrors.name = 'Name is required';
        if (!formData.email) formErrors.email = 'Email is required';
        if (!formData.subject) formErrors.subject = 'Subject is required';
        if (!formData.message) formErrors.message = 'Message is required';
        return formErrors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            // Simulate form submission (this would be where you send the data to your backend)
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000); // Reset the success message after 5 seconds
            setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="contact-us-container">
            <h1>Contact Us</h1>
            <p>If you have any questions, feel free to reach out. We’re here to help!</p>

            {submitted && <p className="success-message">Your message has been sent successfully!</p>}

            <form className="contact-us-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                    />
                    {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                    />
                    {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <button type="submit" className="submit-btn">Send Message</button>
            </form>
        </div>
    );
};

export default ContactUs;
