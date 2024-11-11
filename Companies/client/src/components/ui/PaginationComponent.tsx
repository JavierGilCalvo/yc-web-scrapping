import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"; // Asegúrate de importar tus componentes

const PaginationComponent = ({
  page,
  totalPages,
  goToPage,
  nextPage,
  prevPage,
}: {
  page: number;
  totalPages: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}) => {
  const maxPages = 5; // Número máximo de botones visibles
  const pages = [];

  const startPage = Math.max(1, page - Math.floor(maxPages / 2));
  const endPage = Math.min(totalPages, startPage + maxPages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination>
      <PaginationContent className="">
        <PaginationItem onClick={() => prevPage()}>
          <PaginationPrevious className="text-primary" href="#" />
        </PaginationItem>
        <PaginationItem onClick={() => goToPage(1)}>
          <PaginationLink
            href="#"
            isActive={page === 1}
            className="text-primary"
          >
            1
          </PaginationLink>
        </PaginationItem>
        {page > 3 && (
          <PaginationItem className="text-primary">
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {/**PRIMERO  */}
        <PaginationItem
          onClick={() =>
            goToPage(page > 2 ? (page === totalPages ? page - 2 : page - 1) : 2)
          }
        >
          <PaginationLink
            className="text-primary"
            href="#"
            isActive={page === 2}
          >
            {page > 2 ? (page === totalPages ? page - 2 : page - 1) : 2}
          </PaginationLink>
        </PaginationItem>
        {/**MEDIO  */}
        <PaginationItem
          onClick={() =>
            goToPage(
              page > 2 ? (page === totalPages ? totalPages - 1 : page) : 3
            )
          }
        >
          <PaginationLink
            className="text-primary"
            href="#"
            isActive={page > 2 && page != totalPages}
          >
            {page > 2 ? (page === totalPages ? totalPages - 1 : page) : 3}
          </PaginationLink>
        </PaginationItem>
        {/**ÚLTIMO  */}
        {page > 2 && page < totalPages - 1 && (
          <PaginationItem
            onClick={() =>
              goToPage(page < totalPages - 1 ? page + 1 : totalPages - 1)
            }
          >
            <PaginationLink href="#" className="text-primary">
              {page < totalPages - 1 ? page + 1 : totalPages - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {page < totalPages - 2 && (
          <PaginationItem className="text-primary">
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem onClick={() => goToPage(totalPages)}>
          <PaginationLink
            href="#"
            isActive={page === totalPages}
            className="text-primary"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem onClick={() => nextPage()}>
          <PaginationNext href="#" className="text-primary" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
