import {
  Card,
  CardContent,
  CardDescription,
  // CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DollarSign, Users, CalendarDays, Trophy } from "lucide-react";
import { formatDateToMonthYear, industryEquivalence } from "@/lib/utils";

/**
 * ICONOS:
 * - DollarSign
 * - Users
 * - CalendarDays
 * - Wrench
 */
export function CompanyCard({
  name,
  industries,
  description,
  lastFundingType,
  lastFundingAmount,
  foundedDate,
  headquartersLocation,
  numberOfEmployees,
}: {
  name: string;
  industries: string;
  description: string;
  lastFundingType: string;
  lastFundingAmount: string;
  foundedDate: string;
  headquartersLocation: string;
  numberOfEmployees: string;
}) {
  return (
    <Card className="w-[50vw] h-auto px-4 pt-4 border-0 hover:bg-secondary duration-300 cursor-pointer">
      <CardContent>
        <div className="flex flex-row w-full items-center gap-6">
          <div className="items-center align-middle">
            <Avatar className="w-[72px] h-[72px]">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col space-y-1.5 gap-2">
            <div className="flex flex-row space-y-1.5 gap-4">
              <CardTitle className="text-base">{name}</CardTitle>
              <CardDescription className="text-xs">
                {headquartersLocation}
              </CardDescription>
            </div>
            <div className="flex flex-col w-[80%] space-y-1.5">
              <p className="text-pretty text-[14px] break-words">
                {description}
              </p>
            </div>
            <div className=" grid grid-cols-[1fr_1fr] items-center space-y-1.5 gap-4">
              <div className="flex flex-row w-[150px] items-center gap-2">
                <div className="flex flex-row  gap-2">
                  {industries.split(",").map((industry: string) => {
                    const trimmedIndustry =
                      industryEquivalence[
                        industry.trim() as keyof typeof industryEquivalence
                      ] || industry.trim();
                    return (
                      <p className="inline-flex items-center text-neutral-800 text-xs bg-gray-200 border rounded-sm px-2 py-1 leading-none">
                        {trimmedIndustry.toUpperCase()}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className=" grid grid-cols-[1fr_1fr_1fr_1fr] items-center gap-4">
                <div className="flex flex-row items-center gap-2">
                  <Trophy className="w-4 h-4 flex-shrink-0 text-muted-foreground"></Trophy>
                  <p className="text-neutral-800 text-xs">{lastFundingType}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <DollarSign className="w-4 h-4 flex-shrink-0 text-muted-foreground"></DollarSign>
                  <p className="text-neutral-800 text-xs">
                    {lastFundingAmount}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <CalendarDays className="w-4 h-4 flex-shrink-0 text-muted-foreground"></CalendarDays>
                  <p className="text-neutral-800 text-xs">
                    {formatDateToMonthYear(foundedDate)}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Users className="w-4 h-4 flex-shrink-0 text-muted-foreground"></Users>
                  <p className="text-neutral-800 text-xs text-right">
                    {numberOfEmployees}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
