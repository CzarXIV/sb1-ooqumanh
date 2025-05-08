import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, FileText, Calendar, Users } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          to="/admin/collections"
          className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <div className="flex items-center gap-4">
            <ShoppingBag size={24} />
            <div>
              <h2 className="font-serif text-xl">Collections</h2>
              <p className="text-gray-600">Manage fashion collections</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/admin/blog"
          className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <div className="flex items-center gap-4">
            <FileText size={24} />
            <div>
              <h2 className="font-serif text-xl">Blog Posts</h2>
              <p className="text-gray-600">Manage journal entries</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/admin/appointments"
          className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <div className="flex items-center gap-4">
            <Calendar size={24} />
            <div>
              <h2 className="font-serif text-xl">Appointments</h2>
              <p className="text-gray-600">View and manage bookings</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/admin/subscribers"
          className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <div className="flex items-center gap-4">
            <Users size={24} />
            <div>
              <h2 className="font-serif text-xl">Subscribers</h2>
              <p className="text-gray-600">View newsletter subscribers</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;