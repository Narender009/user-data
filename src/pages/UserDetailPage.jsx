import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserDetail from '../components/UserDetail';

const USERS_API = 'https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json';

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(USERS_API);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const users = await response.json();
        const selectedUser = users.find(user => user.id === parseInt(id));
        
        if (!selectedUser) {
          throw new Error(`User with ID ${id} not found`);
        }
        
        setUser(selectedUser);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return <div className="text-center py-4">Loading user details...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return <UserDetail user={user} />;
};

export default UserDetailPage;