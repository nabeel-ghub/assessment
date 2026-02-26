import { Todo } from "../types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TodoPaginationProps {
  todoList: Todo[];
  itemsPerPage: number;
  paginationCurrent: number;
  setPaginationCurrent: React.Dispatch<React.SetStateAction<number>>;
  paginationStart: number;
  paginationEnd: number;
}

export function TodoPagination({
  todoList,
  itemsPerPage,
  paginationCurrent,
  setPaginationCurrent,
  paginationStart,
  paginationEnd,
}: TodoPaginationProps) {
  const numberOfPages = Math.ceil(todoList.length / itemsPerPage);
  
  const handlePageChange = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    if (page >= 1 && page <= numberOfPages) {
      setPaginationCurrent(page);
    }
  };

  if (numberOfPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            onClick={(e) => handlePageChange(e, paginationCurrent - 1)}
            className={paginationCurrent === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
          {Array.from({ length: numberOfPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={paginationCurrent === page}
              onClick={(e) => handlePageChange(e, page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext 
            href="#" 
            onClick={(e) => handlePageChange(e, paginationCurrent + 1)}
            className={paginationCurrent === numberOfPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
