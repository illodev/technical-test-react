import {
  ActivityIcon,
  ArrowDownUpIcon,
  SettingsIcon,
  TagIcon,
} from "lucide-react";

import { DashboardHeader } from "@/components/dashboard-header";
import { NavList, NavTrigger } from "@/components/ui/nav";
import { Separator } from "@/components/ui/separator";
import { SidebarNavItem } from "@/types";

interface ProjectLayoutProps {
  children?: React.ReactNode;
  params: {
    projectId: string;
  };
}

export default function ProjectLayout({
  children,
  params,
}: ProjectLayoutProps) {
  const projectSetting: {
    sidebarNav: SidebarNavItem[];
  } = {
    sidebarNav: [
      {
        title: "General",
        href: `/dashboard/projects/${params.projectId}/settings`,
        icon: SettingsIcon,
      },
      {
        title: "Labels",
        href: `/dashboard/projects/${params.projectId}/settings/labels`,
        icon: TagIcon,
      },
      {
        title: "Statuses",
        href: `/dashboard/projects/${params.projectId}/settings/statuses`,
        icon: ActivityIcon,
      },
      {
        title: "Priorities",
        href: `/dashboard/projects/${params.projectId}/settings/priorities`,
        icon: ArrowDownUpIcon,
      },
    ],
  };

  return (
    <>
      <DashboardHeader
        heading="Project Settings"
        text="Manage your project settings."
      />
      <Separator />
      <div className="container py-12 grid flex-1 gap-8 md:grid-cols-[200px_1fr]">
        <NavList
          direction="vertical"
          matchBehavior="exact"
          className="border-none"
        >
          {projectSetting.sidebarNav.map((item) => (
            <NavTrigger
              key={item.href}
              href={item.href as string}
              title={item.title}
            >
              {item.icon && <item.icon className="mr-2 h-4 w-4" />}
              {item.title}
            </NavTrigger>
          ))}
        </NavList>
        <div className="flex-1 lg:max-w-4xl">{children}</div>
      </div>
    </>
  );
}
