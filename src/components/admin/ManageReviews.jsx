import { useState, useEffect } from 'react';
import { fetchAllReviews, approveReview, deleteReview } from '../../services/api';
import { toast } from 'react-toastify';
import { Check, Trash } from 'lucide-react';

export default function ManageReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const { data } = await fetchAllReviews();
    setReviews(data);
  };

  const handleApprove = async (id) => {
    await approveReview(id);
    toast.success('Review approved');
    loadReviews();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete review?')) {
      await deleteReview(id);
      toast.success('Review deleted');
      loadReviews();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Manage Reviews</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {reviews.map(r => (
          <div key={r._id} className="border-b last:border-0 py-4 dark:border-gray-700">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold dark:text-white">{r.name}</span>
                  <span className="text-sm text-gray-500">({r.rating} stars)</span>
                  {r.approved ? <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Approved</span> : <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">Pending</span>}
                </div>
                <p className="dark:text-gray-300">{r.comment}</p>
              </div>
              <div className="flex gap-2">
                {!r.approved && (
                  <button onClick={() => handleApprove(r._id)} className="text-green-500"><Check size={20} /></button>
                )}
                <button onClick={() => handleDelete(r._id)} className="text-red-500"><Trash size={20} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}