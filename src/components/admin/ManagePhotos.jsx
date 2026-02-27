import { useState, useEffect } from 'react';
import { fetchPhotos, fetchCategories, createPhoto, updatePhoto, deletePhoto, createCategory, deleteCategory } from '../../services/api';
import { toast } from 'react-toastify';
import { Edit, Trash, Plus } from 'lucide-react';

export default function ManagePhotos() {
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [form, setForm] = useState({ title: '', description: '', category: '', price: '', showPrice: true, image: null });
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    loadPhotos();
    loadCategories();
  }, [page]);

  const loadPhotos = async () => {
    const { data } = await fetchPhotos(page);
    setPhotos(data.photos);
    setPages(data.pages);
  };

  const loadCategories = async () => {
    const { data } = await fetchCategories();
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('category', form.category);
    formData.append('price', form.price);
    formData.append('showPrice', form.showPrice);
    if (form.image) formData.append('image', form.image);

    try {
      if (editingId) {
        await updatePhoto(editingId, formData);
        toast.success('Photo updated');
      } else {
        await createPhoto(formData);
        toast.success('Photo added');
      }
      setForm({ title: '', description: '', category: '', price: '', showPrice: true, image: null });
      setEditingId(null);
      loadPhotos();
    } catch (error) {
      toast.error('Error saving photo');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deletePhoto(id);
      toast.success('Photo deleted');
      loadPhotos();
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory) return;
    await createCategory(newCategory);
    setNewCategory('');
    loadCategories();
    toast.success('Category added');
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Delete category? Photos in this category will become uncategorized.')) {
      await deleteCategory(id);
      loadCategories();
      toast.success('Category deleted');
    }
  };

  const editPhoto = (photo) => {
    setEditingId(photo._id);
    setForm({
      title: photo.title,
      description: photo.description,
      category: photo.category?._id || '',
      price: photo.price,
      showPrice: photo.showPrice,
      image: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Manage Photos</h1>

      {/* Categories */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Categories</h2>
        <div className="flex gap-2 mb-4">
          <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="New category" className="p-2 border rounded flex-1 dark:bg-gray-700 dark:text-white" />
          <button onClick={handleAddCategory} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <div key={cat._id} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full flex items-center gap-2">
              <span className="dark:text-white">{cat.name}</span>
              <button onClick={() => handleDeleteCategory(cat._id)} className="text-red-500 hover:text-red-700"><Trash size={16} /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">{editingId ? 'Edit' : 'Add'} Photo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required className="p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <input type="text" placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="p-2 border rounded dark:bg-gray-700 dark:text-white" />
          <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} required className="p-2 border rounded dark:bg-gray-700 dark:text-white">
            <option value="">Select Category</option>
            {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
          </select>
<input type="number" placeholder="Price (₹)" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className="p-2 border rounded dark:bg-gray-700 dark:text-white" />          <label className="flex items-center gap-2 dark:text-white">
            <input type="checkbox" checked={form.showPrice} onChange={(e) => setForm({...form, showPrice: e.target.checked})} />
            Show Price
          </label>
          <input type="file" accept="image/*" onChange={(e) => setForm({...form, image: e.target.files[0]})} className="p-2 border rounded dark:bg-gray-700 dark:text-white" />
        </div>
        <button type="submit" className="mt-4 bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded hover:opacity-80">{editingId ? 'Update' : 'Add'} Photo</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', description: '', category: '', price: '', showPrice: true, image: null }); }} className="ml-2 bg-gray-500 text-white px-6 py-2 rounded">Cancel</button>}
      </form>

      {/* Photo List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">All Photos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map(photo => (
            <div key={photo._id} className="border rounded-lg p-2 dark:border-gray-700">
              <img src={photo.imageUrl} alt={photo.title} className="w-full h-40 object-cover rounded" />
              <h3 className="font-semibold mt-2 dark:text-white">{photo.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{photo.category?.name}</p>
              {photo.showPrice && <p className="dark:text-white">₹{photo.price}</p>}
              <div className="flex gap-2 mt-2">
                <button onClick={() => editPhoto(photo)} className="text-blue-500"><Edit size={18} /></button>
                <button onClick={() => handleDelete(photo._id)} className="text-red-500"><Trash size={18} /></button>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(pages).keys()].map(p => (
            <button key={p} onClick={() => setPage(p+1)} className={`px-3 py-1 rounded ${page === p+1 ? 'bg-black text-white' : 'bg-gray-200'}`}>{p+1}</button>
          ))}
        </div>
      </div>
    </div>
  );
}