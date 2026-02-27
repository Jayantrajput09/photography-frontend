import { useState } from 'react';
import { createBooking } from '../../services/api';
import { toast } from 'react-toastify';

export default function Booking() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    date: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBooking(form);
      toast.success('Booking sent! We’ll contact you soon.');
      setForm({ name: '', phone: '', email: '', eventType: '', date: '', message: '' });
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  return (
    <section id="booking" className="py-20 px-4 bg-white dark:bg-gray-800 transition-colors">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-4xl font-bold text-center mb-8 dark:text-white">Book a Session</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
          <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} required className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
          <select value={form.eventType} onChange={(e) => setForm({...form, eventType: e.target.value})} required className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white">
            <option value="">Select Event Type</option>
            <option value="Wedding">Wedding</option>
            <option value="Pre-wedding">Pre-wedding</option>
            <option value="Birthday">Birthday</option>
            <option value="Event">Event</option>
          </select>
          <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} required className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
          <textarea placeholder="Message" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} rows="4" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"></textarea>
          <button type="submit" className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-lg font-semibold hover:opacity-80 transition">Send Booking</button>
        </form>
      </div>
    </section>
  );
}