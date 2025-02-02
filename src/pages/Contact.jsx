import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    alert(`Message sent! We'll get back to you at ${email}.`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-16">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-8">
        Have questions or need support? Reach out and we’ll be happy to assist!
      </p>
      
      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="text-lg font-medium text-gray-800">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border border-gray-300 rounded-md text-gray-800"
            required
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-lg font-medium text-gray-800">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-md text-gray-800"
            required
          />
        </div>

        {/* Message Input */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="message" className="text-lg font-medium text-gray-800">Your Message</label>
          <textarea
            id="message"
            placeholder="Type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-3 border border-gray-300 rounded-md text-gray-800 h-40"
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-blue-900 py-3 rounded-full hover:bg-yellow-300 transition duration-300"
        >
          Send Message
        </button>
      </form>

      {/* Contact Information */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4">Contact Details</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-blue-900">Our Office Location</h3>
          <p className="text-gray-700">We’re located at 123 Uber Road, CityCenter, State, 12345. Visit us or send us a letter for further communication.</p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-blue-900">Customer Support</h3>
          <p className="text-gray-700">For inquiries or assistance, reach out to us at: <a href="mailto:support@ubermotorbike.com" className="text-blue-500">support@ridexpress.com</a></p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-blue-900">Sales & Bookings</h3>
          <p className="text-gray-700">For ride bookings and special offers, email us at: <a href="mailto:bookings@ubermotorbike.com" className="text-blue-500">bookings@ubermotorbike.com</a></p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-blue-900">Phone Support</h3>
          <p className="text-gray-700">If you need immediate help, give us a call at:</p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Customer Support: <a href="tel:+1234567890" className="text-blue-500">(254) 792397476</a></li>
            <li>Sales: <a href="tel:+0987654321" className="text-blue-500">(987) 654-3210</a></li>
            <li>Emergency: <a href="tel:+18001234567" className="text-blue-500">(800) 123-4567</a></li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-blue-900">Business Hours</h3>
          <p className="text-gray-700">We are available during the following hours:</p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
            <li>Saturday: 10:00 AM - 4:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-blue-900">Social Media</h3>
          <p className="text-gray-700">Follow us on social media for updates, offers, and more:</p>
          <div className="flex space-x-6 justify-center">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">
              Facebook
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">
              Twitter
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">
              Instagram
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
