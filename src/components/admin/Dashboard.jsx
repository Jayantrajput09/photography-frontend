import { Link } from 'react-router-dom';
import { Users, Image, Calendar, Star, Settings } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/photos" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition flex items-center gap-4">
          <Image size={40} className="text-blue-500" />
          <div>
            <h2 className="text-xl font-semibold dark:text-white">Manage Photos</h2>
            <p className="text-gray-500 dark:text-gray-400">Add, edit, delete photos</p>
          </div>
        </Link>
        <Link to="/admin/bookings" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition flex items-center gap-4">
          <Calendar size={40} className="text-green-500" />
          <div>
            <h2 className="text-xl font-semibold dark:text-white">Bookings</h2>
            <p className="text-gray-500 dark:text-gray-400">View and manage bookings</p>
          </div>
        </Link>
        <Link to="/admin/reviews" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition flex items-center gap-4">
          <Star size={40} className="text-yellow-500" />
          <div>
            <h2 className="text-xl font-semibold dark:text-white">Reviews</h2>
            <p className="text-gray-500 dark:text-gray-400">Approve or delete reviews</p>
          </div>
        </Link>
        <Link to="/admin/settings" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition flex items-center gap-4">
          <Settings size={40} className="text-gray-500" />
          <div>
            <h2 className="text-xl font-semibold dark:text-white">Settings</h2>
            <p className="text-gray-500 dark:text-gray-400">Update site info</p>
          </div>
        </Link>
      </div>
    </div>
  );
}