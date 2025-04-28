import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/ui/AnimatedSection';
import { appointmentService } from '../firebase/services/appointmentService';
import { format } from 'date-fns';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    date: '',
    time: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.title = 'Contact | S&M Collection';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      if (formData.subject === 'appointment') {
        if (!formData.date || !formData.time) {
          throw new Error('Please select both date and time for your appointment');
        }

        await appointmentService.createAppointment({
          name: formData.name,
          email: formData.email,
          date: format(new Date(formData.date), 'yyyy-MM-dd'),
          time: formData.time,
          purpose: formData.message
        });
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        date: '',
        time: ''
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  const isAppointment = formData.subject === 'appointment';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pt-32 pb-16 bg-gray-100">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl mb-6">Contact Us</h1>
            <p className="text-lg">
              Get in touch with our team for inquiries, appointments, or collaboration opportunities.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <div className="mb-12">
                <h2 className="font-serif text-2xl mb-4">Visit Our Showroom</h2>
                <p className="mb-6">
                  Experience S&M Collection in person at our Milan showroom. Schedule an appointment to explore our latest pieces and meet with our styling consultants.
                </p>
                <div className="space-y-2 text-gray-600">
                  <p>Via della Moda, 123</p>
                  <p>20121 Milan, Italy</p>
                  <p>+39 02 1234 5678</p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl mb-4">Opening Hours</h2>
                <div className="space-y-2 text-gray-600">
                  <p>Monday - Friday: 10:00 - 19:00</p>
                  <p>Saturday: 11:00 - 18:00</p>
                  <p>Sunday: By appointment only</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="">Select a subject</option>
                    <option value="appointment">Book an Appointment</option>
                    <option value="press">Press Inquiry</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {isAppointment && (
                  <>
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={format(new Date(), 'yyyy-MM-dd')}
                        required={isAppointment}
                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                      />
                    </div>

                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Time
                      </label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required={isAppointment}
                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                      >
                        <option value="">Select a time</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:00">17:00</option>
                        <option value="18:00">18:00</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {isAppointment ? 'Additional Notes' : 'Message'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full btn-primary py-3"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && (
                  <p className="text-green-600 text-center">
                    {isAppointment 
                      ? 'Thank you for booking an appointment. We will confirm your slot shortly.'
                      : 'Thank you for your message. We\'ll be in touch soon.'}
                  </p>
                )}

                {status === 'error' && (
                  <p className="text-red-600 text-center">{errorMessage}</p>
                )}
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-black text-white">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-8">Follow Us</h2>
            <p className="text-lg mb-12">
              Stay connected with S&M Collection on social media for the latest updates and behind-the-scenes content.
            </p>
            <div className="flex justify-center gap-8">
              <a href="#" className="hover:opacity-70 transition-opacity">Instagram</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Facebook</a>
              <a href="#" className="hover:opacity-70 transition-opacity">Twitter</a>
              <a href="#" className="hover:opacity-70 transition-opacity">LinkedIn</a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;