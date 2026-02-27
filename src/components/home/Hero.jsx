import { useEffect, useState } from 'react';
import { fetchSettings } from '../../services/api';

export default function Hero() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetchSettings().then(({ data }) => setSettings(data));
  }, []);

  return (
    <section
      className="relative h-screen flex items-center justify-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${settings.heroBackground || '/default-hero.jpg'})` }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div className="relative z-10 text-center px-4 animate-fade-in">
        {/* Circular logo with fixed width/height */}
        {settings.logo && (
          <img 
            src={settings.logo} 
            alt="logo" 
            className="w-20 h-20 mx-auto mb-4 rounded-full object-cover" 
          />
        )}
        <h1 className="text-5xl md:text-7xl font-bold mb-4">{settings.brandName || 'Photography'}</h1>
        <p className="text-xl md:text-2xl mb-8">{settings.heroTagline || 'Capturing moments'}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#booking" className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition glassmorphism">
            Book Now
          </a>
          <a href={`tel:${settings.phone}`} className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
            Call Now
          </a>
          <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition">
            WhatsApp
          </a>
          <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="bg-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition">
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}