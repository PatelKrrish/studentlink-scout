
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface StudentPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const StudentPagination = ({ currentPage, totalPages, onPageChange }: StudentPaginationProps) => {
  if (totalPages <= 1) return null;

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, last page, current page, and neighbors
      const leftNeighbor = Math.max(1, currentPage - 1);
      const rightNeighbor = Math.min(totalPages, currentPage + 1);
      
      if (currentPage > 2) {
        pages.push(1);
        if (currentPage > 3) {
          pages.push('ellipsis1');
        }
      }
      
      for (let i = leftNeighbor; i <= rightNeighbor; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
          pages.push('ellipsis2');
        }
        pages.push(totalPages);
      }
    }
    
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(currentPage - 1)}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          
          {pages.map((page, index) => {
            if (page === 'ellipsis1' || page === 'ellipsis2') {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationLink>...</PaginationLink>
                </PaginationItem>
              );
            }
            
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => onPageChange(Number(page))}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange(currentPage + 1)}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return renderPagination();
};

export default StudentPagination;
