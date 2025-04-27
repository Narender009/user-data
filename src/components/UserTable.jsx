import { Link } from 'react-router-dom';

const UserTable = ({ users, sortKey, sortOrder, onSort }) => {
  const columns = [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'age', label: 'Age' },
    { key: 'email', label: 'Email' },
    { key: 'web', label: 'Website' }
  ];
  
  const handleSort = (key) => {
    const newSortOrder = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(key, newSortOrder);
  };
  
  // Render both sort icons for all columns
  const renderSortIcons = (column) => {
    return (
      <span className="sort-icons">
        <span className={`sort-icon up ${sortKey === column && sortOrder === 'asc' ? 'active' : ''}`}>▲</span>
        <span className={`sort-icon down ${sortKey === column && sortOrder === 'desc' ? 'active' : ''}`}>▼</span>
      </span>
    );
  };
  
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map(column => (
              <th 
                key={column.key}
                onClick={() => handleSort(column.key)}
              >
                {column.label} {renderSortIcons(column.key)}
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
                    className="blue-link"
                  >
                    {user.first_name}
                  </Link>
                </td>
                <td>{user.last_name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>
                  <a 
                    href={user.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    {user.web}
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
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