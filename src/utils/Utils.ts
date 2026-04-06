 export const getPageNumbers = (totalItems,currentPage,itemsPerPage) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages: (number | string)[] = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    // Show all pages if there are 5 or fewer
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    // Always show Page 1
    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    // Show neighbors of current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show Last Page
    pages.push(totalPages);
  }
  return pages;
};