import React, { useState, useEffect } from 'react';
import { EmailOptIn, emailOptInService } from '../../firebase/services/emailOptInService';
import { format } from 'date-fns';

const AdminSubscribers: React.FC = () => {
  const [subscribers, setSubscribers] = useState<EmailOptIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSubscribers();
  }, []);

  const loadSubscribers = async () => {
    try {
      const data = await emailOptInService.getEmails();
      setSubscribers(data);
    } catch (err) {
      setError('Failed to load subscribers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading subscribers...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div>
      <h1 className="font-serif text-3xl mb-8">Newsletter Subscribers</h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4">Email</th>
              <th className="text-left py-4">Subscribed Date</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id} className="border-b">
                <td className="py-4">{subscriber.email}</td>
                <td className="py-4">{format(new Date(subscriber.createdAt), 'MMM d, yyyy')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSubscribers;