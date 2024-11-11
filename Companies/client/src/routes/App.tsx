import { Table, TableBody, TableRow } from "@//components/ui/table";
import PaginationComponent from "@/components/ui/PaginationComponent";
import { useCompanies } from "@/hooks/useCompanies";
//import { useScores } from "@/hooks/useScores";
import { Company } from "@/lib/types";
import { CompanyCard } from "./CompanyCard";

export default function App() {
  const { companies, page, totalPages, nextPage, prevPage, goToPage } =
    useCompanies();
  //const { scores, loadingScores, errorScores } = useScores();
  return (
    <>
      <div className="flex flex-col items-center justify-center p-2 gap-4">
        <PaginationComponent
          page={page}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
          goToPage={goToPage}
        ></PaginationComponent>
        <Table className="p-0">
          <TableBody className="border rounded-t-lg rounded-b-lg">
            {companies?.map((company: Company) => (
              <TableRow key={company.id}>
                <CompanyCard
                  name={company.name}
                  industries={company.industries}
                  description={company.description}
                  headquartersLocation={company.headquartersLocation}
                  foundedDate={company.foundedDate}
                  lastFundingType={company.lastFundingType}
                  lastFundingAmount={company.lastFundingAmount}
                  numberOfEmployees={company.numberOfEmployees}
                ></CompanyCard>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PaginationComponent
          page={page}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
          goToPage={goToPage}
        ></PaginationComponent>
      </div>
    </>
  );
}
