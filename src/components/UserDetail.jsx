import { Link } from 'react-router-dom';

const UserDetail = ({ user }) => {
  if (!user) {
    return <div>Loading user data...</div>;
  }

  const fields = [
    { key: 'id', label: 'ID' },
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'age', label: 'Age' },
    { key: 'email', label: 'Email' },
    { key: 'web', label: 'Website' },
    { key: 'company_name', label: 'Company' },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' },
    { key: 'zip', label: 'ZIP' }
  ];

  return (
    <div className="user-detail">
      <Link to="/users" className="back-button">
        ← Back to Users
      </Link>
      
      <h2 className="text-2xl font-bold mb-6">
        User Details: {user.first_name} {user.last_name}
      </h2>
      
      <div className="detail-content">
        {fields.map(field => (
          <div key={field.key} className="detail-row">
            <div className="detail-label">{field.label}:</div>
            <div className="detail-value">
              {field.key === 'web' ? (
                <a 
                  href={user[field.key]} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {user[field.key]}
                </a>
              ) : (
                user[field.key]
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetail;