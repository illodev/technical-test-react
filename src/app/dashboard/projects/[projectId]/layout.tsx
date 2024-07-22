import { NavList, NavTrigger } from "@/components/ui/nav";
import { getProject } from "@/lib/queries/project.queries";
import { MainNavItem, SidebarNavItem } from "@/types";
import { SettingsIcon, StretchHorizontalIcon } from "lucide-react";
import { notFound } from "next/navigation";

interface ProjectLayoutProps {
  children?: React.ReactNode;
  params: {
    projectId: string;
  };
}

export default async function ProjectLayout({
  children,
  params,
}: ProjectLayoutProps) {
  const project = await getProject(params.projectId);

  if (!project) {
    notFound();
  }

  const projectConfig: {
    mainNav: MainNavItem[];
    sidebarNav: SidebarNavItem[];
  } = {
    mainNav: [],
    sidebarNav: [
      {
        title: "Backlog",
        href: `/dashboard/projects/${params.projectId}/backlog`,
        icon: StretchHorizontalIcon,
      },
      {
        title: "Settings",
        href: `/dashboard/projects/${params.projectId}/settings`,
        icon: SettingsIcon,
      },
    ],
  };

  return (
    <div className="flex-1">
      <NavList>
        {projectConfig.sidebarNav.map((item) => (
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
      {children}
    </div>
  );
}
