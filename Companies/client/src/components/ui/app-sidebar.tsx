import {
  DollarSign,
  Trophy,
  Users,
  Calendar,
  Home,
  Inbox,
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
import { title } from "process";

// Menu items.
const items = [
  {
    title: "Industry",
    url: "#",
    icon: Settings,
  },
  {
    title: "Last Funding Type",
    url: "#",
    icon: Trophy,
  },
  {
    title: "Last Funding Amount",
    url: "#",
    icon: DollarSign,
  },
  {
    title: "Number of Employees",
    url: "#",
    icon: Users,
  },
  {
    title: "Number of Competitors",
    url: "#",
    icon: Search,
  },
  {
    title: "Founding Date",
    url: "#",
    icon: Calendar,
  },
];

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
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
