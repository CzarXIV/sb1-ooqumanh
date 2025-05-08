import React, { useState, useEffect } from 'react';
import { BlogPost, blogService } from '../../firebase/services/blogService';
import { format } from 'date-fns';
import { X } from 'lucide-react';

interface BlogFormData {
  title: string;
  content: string;
  author: string;
  category: string;
  excerpt: string;
  image: string;
  destination: 'press' | 'journal';
}

const initialFormData: BlogFormData = {
  title: '',
  content: '',
  author: '',
  category: '',
  excerpt: '',
  image: '',
  destination: 'journal'
};

const AdminBlog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [useImageUrl, setUseImageUrl] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await blogService.getPosts();
      setPosts(data);
    } catch (err) {
      setError('Failed to load blog posts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // If changing image URL, update preview
    if (name === 'image' && useImageUrl) {
      setImagePreview(value);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData(prev => ({ ...prev, image: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      if (!formData.title || !formData.content || !formData.author || !formData.category || !formData.excerpt || !formData.destination) {
        throw new Error('Please fill in all required fields');
      }

      // If using image URL, ensure it's a valid URL
      if (useImageUrl && formData.image) {
        try {
          new URL(formData.image);
        } catch {
          throw new Error('Please enter a valid image URL');
        }
      }

      if (editingId) {
        await blogService.updatePost(editingId, formData, useImageUrl ? undefined : imageFile);
      } else {
        await blogService.createPost(formData, useImageUrl ? undefined : imageFile);
      }
      
      await loadPosts();
      resetForm();
    } catch (err) {
      console.error('Failed to save post:', err);
      setError(err instanceof Error ? err.message : 'Failed to save post');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      content: post.content,
      author: post.author,
      category: post.category,
      excerpt: post.excerpt,
      image: post.image,
      destination: post.destination
    });
    setImagePreview(post.image);
    setImageFile(null);
    setEditingId(post.id);
    setShowForm(true);
    setUseImageUrl(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await blogService.deletePost(id);
        await loadPosts();
      } catch (err) {
        console.error('Failed to delete post:', err);
        setError('Failed to delete post');
      }
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setImageFile(null);
    setImagePreview('');
    setEditingId(null);
    setShowForm(false);
    setError('');
    setUseImageUrl(false);
  };

  if (loading) {
    return <div>Loading blog posts...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl">Blog Posts</h1>
        <button 
          className="btn-primary py-2 px-4"
          onClick={() => setShowForm(true)}
        >
          Create New Post
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
                {editingId ? 'Edit Post' : 'Create New Post'}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination
                </label>
                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                >
                  <option value="journal">Journal</option>
                  <option value="press">Press</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Behind the Scenes">Behind the Scenes</option>
                  <option value="Design">Design</option>
                  <option value="Sustainability">Sustainability</option>
                  <option value="Events">Events</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded"
                  rows={6}
                  required
                />
              </div>

              <div>
                <div className="flex items-center gap-4 mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Image Source:
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={!useImageUrl}
                      onChange={() => setUseImageUrl(false)}
                      className="mr-2"
                    />
                    Upload File
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      checked={useImageUrl}
                      onChange={() => setUseImageUrl(true)}
                      className="mr-2"
                    />
                    Image URL
                  </label>
                </div>

                {useImageUrl ? (
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                    className="w-full px-4 py-2 border rounded"
                  />
                ) : (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                )}

                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="Selected image preview" 
                    className="mt-2 h-32 object-cover"
                  />
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-4 py-2"
                  disabled={submitting}
                >
                  {submitting 
                    ? (editingId ? 'Updating...' : 'Creating...') 
                    : (editingId ? 'Update Post' : 'Create Post')}
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
              <th className="text-left py-4">Destination</th>
              <th className="text-left py-4">Category</th>
              <th className="text-left py-4">Author</th>
              <th className="text-left py-4">Date</th>
              <th className="text-left py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b">
                <td className="py-4">{post.title}</td>
                <td className="py-4 capitalize">{post.destination}</td>
                <td className="py-4">{post.category}</td>
                <td className="py-4">{post.author}</td>
                <td className="py-4">{format(new Date(post.date), 'MMM d, yyyy')}</td>
                <td className="py-4">
                  <button 
                    onClick={() => handleEdit(post)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(post.id!)}
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

export default AdminBlog;