import { MainNavItem, SidebarNavItem } from "@/types";
import { FolderIcon, HomeIcon } from "lucide-react";

export const dashboardConfig: {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
} = {
  mainNav: [],
  sidebarNav: [
    {
      title: "Overview",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: FolderIcon,
    },
  ],
};
