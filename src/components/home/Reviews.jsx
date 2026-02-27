import { useState, useEffect } from 'react';
import { fetchApprovedReviews, createReview } from '../../services/api';
import { Star } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    const { data } = await fetchApprovedReviews();
    setReviews(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview(form);
      toast.success('Review submitted for approval!');
      setForm({ name: '', rating: 5, comment: '' });
    } catch (error) {
      toast.error('Error submitting review');
    }
  };

  return (
    <section id="reviews" className="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-8 dark:text-white">Client Reviews</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Existing Reviews */}
          <div>
            {reviews.map((review) => (
              <div key={review._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill={i < review.rating ? 'gold' : 'none'} stroke={i < review.rating ? 'gold' : 'gray'} />
                  ))}
                </div>
                <p className="dark:text-white">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-2">- {review.name}</p>
              </div>
            ))}
          </div>
          {/* Submit Review */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 dark:text-white">Leave a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Your Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
              <div className="flex items-center gap-2">
                <span className="dark:text-white">Rating:</span>
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} size={24} onClick={() => setForm({...form, rating: star})} className="cursor-pointer" fill={star <= form.rating ? 'gold' : 'none'} stroke="gold" />
                ))}
              </div>
              <textarea placeholder="Your review" value={form.comment} onChange={(e) => setForm({...form, comment: e.target.value})} required rows="4" className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white"></textarea>
              <button type="submit" className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-lg font-semibold">Submit Review</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}