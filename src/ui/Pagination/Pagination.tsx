"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  totalPages: number;
  currentPage: number;
};

export function PaginationWrapper({ totalPages, currentPage }: Props) {
  if (totalPages <= 1) return null;

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={isFirstPage ? undefined : createPageURL(currentPage - 1)}
            aria-disabled={isFirstPage}
            className={isFirstPage ? "pointer-events-none opacity-50" : ""}
          >
            Anterior
          </PaginationPrevious>
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          const isActive = page === currentPage;

          return (
            <PaginationItem key={index}>
              <PaginationLink
                href={isActive ? undefined : createPageURL(page)}
                aria-current={isActive ? "page" : undefined}
                aria-disabled={isActive}
                className={isActive ? "pointer-events-none opacity-50" : ""}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={isLastPage ? undefined : createPageURL(currentPage + 1)}
            aria-disabled={isLastPage}
            className={isLastPage ? "pointer-events-none opacity-50" : ""}
          >
            Siguiente
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
