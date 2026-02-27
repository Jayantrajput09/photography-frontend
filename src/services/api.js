import api from './axiosConfig';

// Photos
export const fetchPhotos = (page = 1, keyword = '', category = 'all') => {
  let url = `/photos?page=${page}&keyword=${keyword}`;
  if (category && category !== 'all') {
    url += `&category=${category}`;
  }
  return api.get(url);
};
export const fetchPhotosByCategory = (categoryId) => api.get(`/photos/category/${categoryId}`);
export const createPhoto = (formData) => api.post('/photos', formData);
export const updatePhoto = (id, formData) => api.put(`/photos/${id}`, formData);
export const deletePhoto = (id) => api.delete(`/photos/${id}`);

// Categories
export const fetchCategories = () => api.get('/categories');
export const createCategory = (name) => api.post('/categories', { name });
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Bookings
export const createBooking = (data) => api.post('/bookings', data);
export const fetchBookings = () => api.get('/bookings');
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);

// Reviews
export const fetchApprovedReviews = () => api.get('/reviews/approved');
export const fetchAllReviews = () => api.get('/reviews');
export const createReview = (data) => api.post('/reviews', data);
export const approveReview = (id) => api.put(`/reviews/${id}/approve`);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

// Settings
export const fetchSettings = () => api.get('/settings');
export const updateSettings = (data) => api.put('/settings', data);
export const uploadLogo = (formData) => api.put('/settings/logo', formData);