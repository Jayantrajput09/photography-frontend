import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { fetchPhotos, fetchCategories } from '../../services/api';
import Modal from 'react-modal';
import { X } from 'lucide-react';

Modal.setAppElement('#root');

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadPhotos();
    fetchCategories().then(({ data }) => setCategories(data));
  }, [page, selectedCategory, search]);

  const loadPhotos = async () => {
    const { data } = await fetchPhotos(page, search, selectedCategory); // ✅ category passed
    setPhotos(data.photos);
    setPages(data.pages);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const openModal = (photo) => {
    setCurrentPhoto(photo);
    setModalIsOpen(true);
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 dark:text-white">Gallery</h2>
        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search photos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg border dark:bg-gray-800 dark:text-white"
          />
        </div>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full ${selectedCategory === 'all' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={`px-4 py-2 rounded-full ${selectedCategory === cat._id ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-4 w-auto"
          columnClassName="pl-4 bg-clip-padding"
        >
          {photos.map((photo) => (
            <div key={photo._id} className="mb-4 cursor-pointer group" onClick={() => openModal(photo)}>
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-xl"
              />
              {photo.showPrice && photo.price && (
                <div className="mt-2 text-lg font-semibold dark:text-white">₹{photo.price}</div>
              )}
              {photo.description && <p className="text-sm text-gray-600 dark:text-gray-300">{photo.description}</p>}
            </div>
          ))}
        </Masonry>

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(pages).keys()].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p + 1)}
              className={`px-4 py-2 rounded ${page === p + 1 ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
            >
              {p + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-4xl w-full outline-none"
        overlayClassName="fixed inset-0 bg-black/75 backdrop-blur-sm"
      >
        {currentPhoto && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 relative">
            <button onClick={() => setModalIsOpen(false)} className="absolute top-2 right-2 text-gray-600 dark:text-gray-300">
              <X size={24} />
            </button>
            <img src={currentPhoto.imageUrl} alt={currentPhoto.title} className="w-full rounded-lg" />
            <h3 className="text-2xl font-bold mt-4 dark:text-white">{currentPhoto.title}</h3>
            {currentPhoto.showPrice && currentPhoto.price && <p className="text-xl dark:text-white">₹{currentPhoto.price}</p>}
            <p className="dark:text-gray-300">{currentPhoto.description}</p>
          </div>
        )}
      </Modal>
    </section>
  );
}