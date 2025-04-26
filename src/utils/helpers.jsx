// Sort function for different data types
export const sortData = (data, sortKey, sortOrder) => {
    return [...data].sort((a, b) => {
      let valueA = a[sortKey];
      let valueB = b[sortKey];
      
      // Handle numeric sorting
      if (sortKey === 'age' || sortKey === 'id') {
        valueA = Number(valueA);
        valueB = Number(valueB);
      }
      // Handle string sorting
      else {
        valueA = String(valueA).toLowerCase();
        valueB = String(valueB).toLowerCase();
      }
      
      if (valueA < valueB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };
  
  // Search function to filter users by first_name or last_name
  export const searchUsers = (users, searchTerm) => {
    if (!searchTerm) return users;
    
    searchTerm = searchTerm.toLowerCase();
    return users.filter(
      user => 
        user.first_name.toLowerCase().includes(searchTerm) || 
        user.last_name.toLowerCase().includes(searchTerm)
    );
  };
  
  // Pagination function to get users for current page
  export const paginateData = (data, currentPage, perPage) => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return data.slice(startIndex, endIndex);
  };