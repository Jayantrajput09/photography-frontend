import { useState, useEffect } from 'react';
import { fetchSettings } from '../../services/api';
import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetchSettings().then(({ data }) => setSettings(data));
  }, []);

  return (
    <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-800 transition-colors">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-8 dark:text-white">Contact</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <MapPin className="dark:text-white" />
              <span className="dark:text-white">{settings.address || '123 Photography St, City'}</span>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <Phone className="dark:text-white" />
              <a href={`tel:${settings.phone}`} className="dark:text-white hover:underline">{settings.phone || '+1 234 567 890'}</a>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <Mail className="dark:text-white" />
              <a href={`mailto:${settings.email}`} className="dark:text-white hover:underline">{settings.email || 'info@photography.com'}</a>
            </div>
            <div className="flex gap-4">
              <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400"><MessageCircle size={32} /></a>
              <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 dark:text-pink-400"><Instagram size={32} /></a>
            </div>
          </div>
          <div className="h-64 md:h-auto">
            <iframe
              src={settings.mapEmbed || 'https://www.google.com/maps/embed?pb=!1m18...'}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}