import {
  DollarSign,
  Trophy,
  Users,
  Calendar,
  Search,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { FundingAmountFilter } from "@/components/ui/filters/FundingAmountFilter";
import { NumberEmployeesFilter } from "@/components/ui/filters/NumberEmployeesFilter";
import { CompetitorsFilter } from "@/components/ui/filters/CompetitorsFilter";
import { LastFundingTypeFilter } from "@/components/ui/filters/LastFundingTypeFilter";

// Menu items.
const items = [
  {
    title: "Industry",
    component: () => <div>Industry Filter</div>, // Si es necesario, renderiza algo específico
    icon: Settings,
  },
  {
    title: "Last Funding Type",
    component: LastFundingTypeFilter, // Representa dinámicamente
    icon: Trophy,
  },
  {
    title: "Last Funding Amount",
    component: FundingAmountFilter, // Componente React dinámico
    icon: DollarSign,
  },
  {
    title: "Number of Employees",
    component: NumberEmployeesFilter,
    icon: Users,
  },
  {
    title: "Number of Competitors",
    component: CompetitorsFilter,
    icon: Search,
  },
  {
    title: "Founding Date",
    component: () => <div>Founding Date Filter</div>,
    icon: Calendar,
  },
];
/**
 Last Funding Amount:
 Min: 0
 Max: 468000000

 Total Funding Equity:
 Min: 0
 Max: 973000000

 Competitors:
 Min: 0
 Max: 775
 */

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <>
                      <item.icon />
                      <span>{item.title}</span>
                      {item.component && <item.component />}
                    </>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
