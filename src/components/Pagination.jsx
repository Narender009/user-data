import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';



const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Generate an array of page numbers to display
    const getPageNumbers = () => {
      const pages = [];
      const maxPagesToShow = 5;
      
      if (totalPages <= maxPagesToShow) {
        // If there are fewer pages than the max to show, display all
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Determine the range of pages to display
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = startPage + maxPagesToShow - 1;
        
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        
        // Add ellipsis indicators if needed
        if (startPage > 1) {
          pages.unshift('...');
          pages.unshift(1);
        }
        
        if (endPage < totalPages) {
          pages.push('...');
          pages.push(totalPages);
        }
      }
      
      return pages;
    };
    
    return (
      <div className="pagination">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </button>
        
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          )
        ))}
        
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight />
        </button>
      </div>
    );
  };
  
  export default Pagination;