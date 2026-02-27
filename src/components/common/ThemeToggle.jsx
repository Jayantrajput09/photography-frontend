import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
      {darkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
    </button>
  );
}