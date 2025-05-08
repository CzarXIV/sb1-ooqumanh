import React, { useState, useEffect } from 'react';
import { Appointment, appointmentService } from '../../firebase/services/appointmentService';
import { format } from 'date-fns';

const AdminAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const data = await appointmentService.getAppointments();
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: Appointment['status']) => {
    try {
      await appointmentService.updateAppointmentStatus(id, status);
      await loadAppointments();
    } catch (err) {
      console.error('Failed to update appointment status:', err);
    }
  };

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Appointments</h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4">Name</th>
              <th className="text-left py-4">Date</th>
              <th className="text-left py-4">Time</th>
              <th className="text-left py-4">Purpose</th>
              <th className="text-left py-4">Status</th>
              <th className="text-left py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-b">
                <td className="py-4">{appointment.name}</td>
                <td className="py-4">{format(new Date(appointment.date), 'MMM d, yyyy')}</td>
                <td className="py-4">{appointment.time}</td>
                <td className="py-4">{appointment.purpose}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded text-sm ${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </td>
                <td className="py-4">
                  <select
                    value={appointment.status}
                    onChange={(e) => handleStatusUpdate(appointment.id!, e.target.value as Appointment['status'])}
                    className="mr-2 border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirm</option>
                    <option value="cancelled">Cancel</option>
                  </select>
                  <button className="text-blue-600 hover:text-blue-800">
                    View Details
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

export default AdminAppointments;