import React, { useState, useEffect } from 'react';
import { Collection, Product, collectionService } from '../../firebase/services/collectionService';
import { X, Plus, Trash } from 'lucide-react';

interface CollectionFormData {
  title: string;
  season: string;
  year: string;
  headline: string;
  description: string;
  coverImage: string;
  galleryImages: string[];
  products: Product[];
}

const initialFormData: CollectionFormData = {
  title: '',
  season: '',
  year: '',
  headline: '',
  description: '',
  coverImage: '',
  galleryImages: [],
  products: []
};

const initialProductData: Product = {
  id: '',
  name: '',
  image: '',
  price: 0
};

const AdminCollections: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CollectionFormData>(initialFormData);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [productFormData, setProductFormData] = useState<Product>(initialProductData);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);

  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      const data = await collectionService.getCollections();
      setCollections(data);
    } catch (err) {
      setError('Failed to load collections');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImageFile(e.target.files[0]);
    }
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryFiles(Array.from(e.target.files));
    }
  };

  const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProductImageFile(e.target.files[0]);
    }
  };

  const handleAddProduct = () => {
    if (productFormData.name && productFormData.price > 0) {
      setFormData(prev => ({
        ...prev,
        products: [...prev.products, { ...productFormData, id: Date.now().toString() }]
      }));
      setProductFormData(initialProductData);
      setProductImageFile(null);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== productId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await collectionService.updateCollection(
          editingId,
          formData,
          coverImageFile || undefined,
          galleryFiles.length > 0 ? galleryFiles : undefined
        );
      } else {
        await collectionService.createCollection(
          formData,
          coverImageFile || undefined,
          galleryFiles.length > 0 ? galleryFiles : undefined
        );
      }
      await loadCollections();
      resetForm();
    } catch (err) {
      console.error('Failed to save collection:', err);
      setError('Failed to save collection');
    }
  };

  const handleEdit = (collection: Collection) => {
    setFormData({
      title: collection.title,
      season: collection.season,
      year: collection.year,
      headline: collection.headline,
      description: collection.description,
      coverImage: collection.coverImage,
      galleryImages: collection.galleryImages,
      products: collection.products
    });
    setEditingId(collection.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      try {
        await collectionService.deleteCollection(id);
        await loadCollections();
      } catch (err) {
        console.error('Failed to delete collection:', err);
        setError('Failed to delete collection');
      }
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCoverImageFile(null);
    setGalleryFiles([]);
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  if (loading) {
    return <div>Loading collections...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl">Collections</h1>
        <button 
          className="btn-primary py-2 px-4"
          onClick={() => setShowForm(true)}
        >
          Add New Collection
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif text-2xl">
                {editingId ? 'Edit Collection' : 'Create New Collection'}
              </h2>
              <button 
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Season
                  </label>
                  <select
                    name="season"
                    value={formData.season}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                  >
                    <option value="">Select season</option>
                    <option value="Spring/Summer">Spring/Summer</option>
                    <option value="Fall/Winter">Fall/Winter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Headline
                </label>
                <input
                  type="text"
                  name="headline"
                  value={formData.headline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="w-full"
                />
                {formData.coverImage && !coverImageFile && (
                  <img 
                    src={formData.coverImage} 
                    alt="Current cover" 
                    className="mt-2 h-32 object-cover"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gallery Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryImagesChange}
                  className="w-full"
                />
                {formData.galleryImages.length > 0 && galleryFiles.length === 0 && (
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {formData.galleryImages.map((image, index) => (
                      <img 
                        key={index}
                        src={image} 
                        alt={`Gallery ${index + 1}`}
                        className="h-24 w-full object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mt-6">
                <h3 className="font-serif text-xl mb-4">Products</h3>
                
                <div className="space-y-4 mb-6">
                  {formData.products.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover"
                      />
                      <div className="flex-grow">
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-gray-600">${product.price}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={productFormData.name}
                      onChange={handleProductInputChange}
                      className="w-full px-4 py-2 border rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={productFormData.price || ''}
                      onChange={handleProductInputChange}
                      className="w-full px-4 py-2 border rounded"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProductImageChange}
                      className="w-full"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleAddProduct}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    <Plus size={20} />
                    Add Product
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-4 py-2"
                >
                  {editingId ? 'Update Collection' : 'Create Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4">Title</th>
              <th className="text-left py-4">Season</th>
              <th className="text-left py-4">Year</th>
              <th className="text-left py-4">Products</th>
              <th className="text-left py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((collection) => (
              <tr key={collection.id} className="border-b">
                <td className="py-4">{collection.title}</td>
                <td className="py-4">{collection.season}</td>
                <td className="py-4">{collection.year}</td>
                <td className="py-4">{collection.products?.length || 0} products</td>
                <td className="py-4">
                  <button 
                    onClick={() => handleEdit(collection)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(collection.id!)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCollections;