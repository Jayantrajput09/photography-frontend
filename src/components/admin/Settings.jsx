import { useState, useEffect } from 'react';
import { fetchSettings, updateSettings, uploadLogo } from '../../services/api';
import { toast } from 'react-toastify';

export default function Settings() {
  const [settings, setSettings] = useState({});
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data } = await fetchSettings();
    setSettings(data);
  };

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update text fields
      await updateSettings(settings);
      // Upload logo separately if selected
      if (logoFile) {
        const formData = new FormData();
        formData.append('logo', logoFile);
        await uploadLogo(formData);
      }
      toast.success('Settings updated');
      loadSettings();
    } catch (error) {
      toast.error('Error saving settings');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Site Settings</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block mb-1 dark:text-white">Logo</label>
            {settings.logo && <img src={settings.logo} alt="logo" className="h-16 mb-2" />}
            <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} className="w-full p-2 border rounded dark:bg-gray-700" />
          </div>
          <div>
            <label className="block mb-1 dark:text-white">Brand Name</label>
            <input type="text" name="brandName" value={settings.brandName || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block mb-1 dark:text-white">Hero Tagline</label>
            <input type="text" name="heroTagline" value={settings.heroTagline || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block mb-1 dark:text-white">Hero Background Image URL</label>
            <input type="text" name="heroBackground" value={settings.heroBackground || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block mb-1 dark:text-white">Phone</label>
            <input type="text" name="phone" value={settings.phone || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block mb-1 dark:text-white">WhatsApp (with country code, no +)</label>
            <input type="text" name="whatsapp" value={settings.whatsapp || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block mb-1 dark:text-white">Instagram URL</label>
            <input type="text" name="instagram" value={settings.instagram || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block mb-1 dark:text-white">Email</label>
            <input type="email" name="email" value={settings.email || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block mb-1 dark:text-white">Address</label>
            <input type="text" name="address" value={settings.address || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          </div>
          <div>
            <label className="block mb-1 dark:text-white">Google Maps Embed URL</label>
            <input type="text" name="mapEmbed" value={settings.mapEmbed || ''} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" />
          </div>
        </div>
        <button type="submit" className="mt-6 bg-black text-white dark:bg-white dark:text-black px-6 py-2 rounded">Save Settings</button>
      </form>
    </div>
  );
}