import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  FileText, 
  Calendar, 
  Users, 
  LogOut 
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-black text-white p-4">
        <div className="container-custom flex justify-between items-center">
          <Link to="/admin" className="font-serif text-xl">S&M Admin</Link>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </nav>

      <div className="container-custom py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <nav className="space-y-2">
                <Link 
                  to="/admin" 
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <Link 
                  to="/admin/collections" 
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                >
                  <ShoppingBag size={18} />
                  Collections
                </Link>
                <Link 
                  to="/admin/blog" 
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                >
                  <FileText size={18} />
                  Blog Posts
                </Link>
                <Link 
                  to="/admin/appointments" 
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                >
                  <Calendar size={18} />
                  Appointments
                </Link>
                <Link 
                  to="/admin/subscribers" 
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                >
                  <Users size={18} />
                  Subscribers
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 md:col-span-9">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;