import React, { useState } from 'react';
import NavBar from '../compunent/Nav';
import Footer from '../compunent/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
    <NavBar/>
        <div className='cover'>
      <div className='contact_form'>
        <form>
          <div className='Contact_us_flex'>
            <div>
              <label className='contact_label'>User name</label>
              <input
                type='text'
                name="username"
                value={formData.username}
                onChange={handleChange}
                className='contact_input'
                placeholder='Enter your name'
              />
            </div>
            <div>
              <label className="contact_label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="contact_input"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className='contact_label'>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className='contact_textarea'
              placeholder='Message'
              rows={5}
            />
          </div>
          <button type="submit" className="contact_button">Send Message</button>
        </form>
      </div>
      <div className='contact_write_up'>
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Whether you have questions, feedback, or just want to connect, our team is always here to help.</p>
        <ul>
          <li>📩 Email: [your email here]</li>
          <li>📞 Phone: [your number here]</li>
          <li>📍 Address: [your address here]</li>
        </ul>
        <p>Or simply fill out the form below, and we’ll get back to you as soon as possible. We value your time and will do our best to respond within 24 hours.</p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Contact;