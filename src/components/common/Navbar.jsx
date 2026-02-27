import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchSettings } from '../../services/api';

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetchSettings().then(({ data }) => setSettings(data));
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          {/* Circular logo */}
          {settings.logo && (
            <img
              src={settings.logo}
              alt="logo"
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <span className="text-2xl font-bold dark:text-white">
            {settings.brandName || 'PhotoStudio'}
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
            Home
          </Link>
          <a href="#gallery" className="dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
            Gallery
          </a>
          <a href="#booking" className="dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
            Book
          </a>
          <a href="#reviews" className="dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
            Reviews
          </a>
          <a href="#contact" className="dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
            Contact
          </a>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
          </button>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} className="dark:text-white" /> : <Menu size={24} className="dark:text-white" />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4">
          <Link
            to="/"
            className="block py-2 dark:text-white"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <a
            href="#gallery"
            className="block py-2 dark:text-white"
            onClick={() => setIsOpen(false)}
          >
            Gallery
          </a>
          <a
            href="#booking"
            className="block py-2 dark:text-white"
            onClick={() => setIsOpen(false)}
          >
            Book
          </a>
          <a
            href="#reviews"
            className="block py-2 dark:text-white"
            onClick={() => setIsOpen(false)}
          >
            Reviews
          </a>
          <a
            href="#contact"
            className="block py-2 dark:text-white"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              setIsOpen(false);
            }}
            className="mt-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
          </button>
        </div>
      )}
    </nav>
  );
}