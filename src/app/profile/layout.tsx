import { DashboardHeader } from "@/components/dashboard-header";
import { NavList, NavTrigger } from "@/components/ui/nav";
import { Separator } from "@/components/ui/separator";
import { SidebarNavItem } from "@/types";
import { LayoutPanelLeftIcon, PaletteIcon, UserCircleIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const profileRoutes: {
    sidebarNav: SidebarNavItem[];
  } = {
    sidebarNav: [
      {
        title: "Details",
        href: "/profile/details",
        icon: UserCircleIcon,
      },
      {
        title: "Appearance",
        href: "/profile/appearance",
        icon: PaletteIcon,
      },
      {
        title: "Advanced",
        href: "/profile/advanced",
        icon: LayoutPanelLeftIcon,
      },
    ],
  };

  return (
    <div className="flex-grow">
      <DashboardHeader heading="Profile" text="Manage your profile settings" />
      <Separator />
      <div className="container py-12 grid flex-1 gap-8 md:grid-cols-[200px_1fr]">
        <NavList
          direction="vertical"
          matchBehavior="exact"
          className="border-none"
        >
          {profileRoutes.sidebarNav.map((item) => (
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
    </div>
  );
}
