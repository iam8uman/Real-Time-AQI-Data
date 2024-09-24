import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination >
      <PaginationContent >
        {currentPage > 1 && (
          <PaginationItem className='bg-slate-950 text-slate-300 hover:bg-slate-600 ' >
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
        )}
        {pageNumbers.slice(0, 8).map((pageNumber) => (
          <PaginationItem key={pageNumber} className='bg-slate-950 text-slate-300 hover:bg-slate-600 '>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(pageNumber);
              }}
              isActive={pageNumber === currentPage}
              className='bg-slate-950 text-slate-300 hover:bg-slate-500 '
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage < totalPages && (
          <PaginationItem className='bg-slate-950 text-slate-300 hover:bg-slate-500 '>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;