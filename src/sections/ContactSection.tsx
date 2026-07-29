'use client';

import { useState } from 'react';
import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import Button from '../components/Button';
import WhatsAppWidget from '../components/WhatsAppWidget';

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    // Basic validation
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFormStatus('error');
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In a real app, you would send to an API route here
      setFormStatus('success');
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center text-navy-900 lg:text-left mb-6">
              Get In Touch
            </h2>
            <p className="text-center text-navy-600/80 max-w-2xl lg:text-left">
              We're here to help you plan your perfect journey. Reach out via any of the methods below or start a WhatsApp chat for instant support.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-navy-900 dark:text-gray-100">Our Office</h3>
                  <p className="text-navy-600/80 max-w-md">
                    AUZBIZ Travel & Tours<br />
                    Office #301, 3rd Floor, Al-Baber Centre,<br />
                    F-8 Markaz, Islamabad, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-navy-900 dark:text-gray-100">Call Us</h3>
                  <p className="text-navy-600/80">
                    <a href="tel:+925111122222" className="hover:text-gold-500 transition-colors">
                      +92 51 111 222 22
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-navy-900 dark:text-gray-100">Email Us</h3>
                  <p className="text-navy-600/80">
                    <a href="mailto:info@auzbiz.com" className="hover:text-gold-500 transition-colors">
                      info@auzbiz.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MessageCircle className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-semibold text-navy-900 dark:text-gray-100">WhatsApp</h3>
                  <p className="text-navy-600/80">
                    <a href="https://wa.me/923464993122" target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors">
                      +92 346 4993122
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-6">
              <a href="#" className="text-navy-600/60 hover:text-navy-800 transition-colors">
                <i className="fab fa-facebook-f fa-xl"></i>
              </a>
              <a href="#" className="text-navy-600/60 hover:text-navy-800 transition-colors">
                <i className="fab fa-twitter fa-xl"></i>
              </a>
              <a href="#" className="text-navy-600/60 hover:text-navy-800 transition-colors">
                <i className="fab fa-instagram fa-xl"></i>
              </a>
              <a href="#" className="text-navy-600/60 hover:text-navy-800 transition-colors">
                <i className="fab fa-linkedin-in fa-xl"></i>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-navy-900 dark:text-gray-100 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-navy-200/50 focus:border-navy-800 focus:ring-2 focus:ring-navy-800/20 bg-white dark:bg-card-bg text-navy-900 dark:text-gray-100 placeholder-navy-400/60"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-900 dark:text-gray-100 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-navy-200/50 focus:border-navy-800 focus:ring-2 focus:ring-navy-800/20 bg-white dark:bg-card-bg text-navy-900 dark:text-gray-100 placeholder-navy-400/60"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-900 dark:text-gray-100 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-navy-200/50 focus:border-navy-800 focus:ring-2 focus:ring-navy-800/20 bg-white dark:bg-card-bg text-navy-900 dark:text-gray-100 placeholder-navy-400/60 h-[120px] resize-none"
                  placeholder="How can we help you plan your trip?"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className={`w-full px-6 py-3.5 rounded-xl font-medium transition-all duration-300 ${formStatus === 'sending'
                    ? 'bg-navy-600/50 cursor-not-allowed'
                    : 'bg-navy-800 text-gold-500 hover:bg-navy-700 hover:shadow-lg'}`}
              >
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {/* Status messages */}
            {formStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600">
                Thank you! Your message has been sent. We'll get back to you within 24 hours.
              </div>
            )}
            {formStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600">
                Please fill in all fields and try again.
              </div>
            )}
          </div>
        </div>

        {/* WhatsApp floating button (already rendered via WhatsAppWidget component) */}
        <div className="mt-8 flex justify-center">
          <p className="text-navy-500 text-center">
            Or start a WhatsApp chat for instant support →
          </p>
        </div>
      </div>

      {/* WhatsApp Widget (floating button) */}
      <WhatsAppWidget />
    </section>
  );
}