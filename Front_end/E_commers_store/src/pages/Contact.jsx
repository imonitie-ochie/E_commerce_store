import React, { useState } from 'react';
import NavBar from '../compunent/Nav';
import Footer from '../compunent/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({ username: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setError('');
    setSuccess('');
  };

  const validate = ({ username, email, message }) => {
    if (!username.trim() || !email.trim() || !message.trim()) return 'Please fill in all fields.';
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(email)) return 'Please enter a valid email address.';
    if (message.trim().length < 10) return 'Message should be at least 10 characters.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validate(formData);
    if (validationError) return setError(validationError);

    try {
      setIsSubmitting(true);
      // Simulate send — replace with your API call (fetch/axios) to post the message
      await new Promise((r) => setTimeout(r, 800));

      setSuccess('Message sent! Thanks — we will get back to you soon.');
      setFormData({ username: '', email: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <NavBar/>

      <main className="max-w-6xl mx-auto p-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Form Card */}
          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-2">Send us a message</h2>
            <p className="text-sm text-gray-500 mb-6">Have a question, feedback or partnership idea? Drop us a note below.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-xs font-medium text-gray-600 mb-2">Full name</span>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-md border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Full name"
                    aria-required="true"
                    aria-invalid={error ? 'true' : 'false'}
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-xs font-medium text-gray-600 mb-2">Email</span>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-md border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Email address"
                    aria-required="true"
                    aria-invalid={error ? 'true' : 'false'}
                  />
                </label>
              </div>

              <label className="flex flex-col mt-4">
                <span className="text-xs font-medium text-gray-600 mb-2">Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows={6}
                  className="w-full rounded-md border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  aria-label="Message"
                  aria-required="true"
                  aria-invalid={error ? 'true' : 'false'}
                />
              </label>

              {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
              {success && <p className="mt-3 text-sm text-green-600" role="status">{success}</p>}

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium shadow-sm transition-shadow disabled:opacity-60
                    bg-gradient-to-r from-indigo-600 to-indigo-500 text-white`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <aside className="space-y-6">
            <div className="bg-gradient-to-tr from-indigo-50 to-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-3xl font-bold">Contact Us</h3>
              <p className="mt-2 text-gray-600">We’d love to hear from you — questions, feedback or collaboration ideas are welcome.</p>

              <ul className="mt-6 space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">📩</span>
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-sm text-gray-500">hello@example.com</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <div className="text-sm font-medium">Phone</div>
                    <div className="text-sm text-gray-500">+1 (555) 555-5555</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <div className="text-sm font-medium">Address</div>
                    <div className="text-sm text-gray-500">123 Example St, City, Country</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-gray-100 p-4">
              <h4 className="font-semibold">Office hours</h4>
              <p className="text-sm text-gray-600 mt-2">Mon — Fri • 9:00 — 18:00</p>
            </div>

            <div className="rounded-2xl overflow-hidden">
              {/* Placeholder map — replace with an iframe or map component if desired */}
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">Map placeholder</div>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
