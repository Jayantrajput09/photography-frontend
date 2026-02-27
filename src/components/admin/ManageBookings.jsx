import { useState, useEffect } from 'react';
import { fetchBookings, deleteBooking } from '../../services/api';
import { toast } from 'react-toastify';
import { Trash } from 'lucide-react';

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const { data } = await fetchBookings();
    setBookings(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this booking?')) {
      await deleteBooking(id);
      toast.success('Booking deleted');
      loadBookings();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Manage Bookings</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b._id} className="border p-4 rounded dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold dark:text-white">{b.name} - {b.eventType}</p>
                  <p className="text-sm dark:text-gray-300">{new Date(b.date).toLocaleDateString()}</p>
                  <p className="dark:text-gray-300">{b.phone} | {b.email}</p>
                  <p className="dark:text-gray-300">{b.message}</p>
                </div>
                <button onClick={() => handleDelete(b._id)} className="text-red-500"><Trash size={20} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}