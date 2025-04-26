import { Link } from 'react-router-dom';

const UserTable = ({ users, sortKey, sortOrder, onSort }) => {
  const columns = [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'age', label: 'Age' },
    { key: 'web', label: 'Website' },
    { key: 'email', label: 'Email' }
  ];
  
  const handleSort = (key) => {
    const newSortOrder = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(key, newSortOrder);
  };
  
  const renderSortIcon = (column) => {
    if (sortKey !== column) return null;
    
    return (
      <span className="sort-icon">
        {sortOrder === 'asc' ? '▲' : '▼'}
      </span>
    );
  };
  
  return (
    <div className="table-container">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map(column => (
              <th 
                key={column.key}
                onClick={() => handleSort(column.key)}
                className="cursor-pointer hover:bg-gray-100"
              >
                {column.label} {renderSortIcon(column.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link 
                    to={`/users/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {user.first_name}
                  </Link>
                </td>
                <td>{user.last_name}</td>
                <td>{user.age}</td>
                <td>
                  <a 
                    href={user.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {user.web}
                  </a>
                </td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;