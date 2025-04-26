import { useState, useEffect } from 'react';
import UserTable from '../components/UserTable';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { sortData, searchUsers, paginateData } from '../utils/helpers';

const USERS_API = 'https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json';
const USERS_PER_PAGE = 10;

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(USERS_API);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page on search
    
    const searched = searchUsers(users, term);
    setFilteredUsers(searched);
  };

  // Handle sort
  const handleSort = (key, order) => {
    setSortKey(key);
    setSortOrder(order);
    
    const sorted = sortData(filteredUsers, key, order);
    setFilteredUsers(sorted);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get current page data
  const currentUsers = paginateData(filteredUsers, currentPage, USERS_PER_PAGE);
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  if (loading) {
    return <div className="text-center py-4">Loading users data...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      
      <div className="mb-4">
        <p>
          {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>
      
      <UserTable 
        users={currentUsers} 
        sortKey={sortKey} 
        sortOrder={sortOrder} 
        onSort={handleSort} 
      />
      
      {filteredUsers.length > 0 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      )}
    </div>
  );
};

export default UsersPage;