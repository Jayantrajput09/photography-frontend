import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold dark:text-white">404</h1>
        <p className="text-xl mt-4 dark:text-white">Page not found</p>
        <Link to="/" className="mt-6 inline-block bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded">Go Home</Link>
      </div>
    </div>
  );
}