import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { TooltipProvider } from "@/components/ui/tooltip";
import { DialogContainer } from "@/components/ui/use-dialog";
import { QUERY_CACHE_KEY } from "@/config/query";
import { QueryProvider } from "@/providers/query-provider";

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

  return (
    <QueryProvider cacheKey={QUERY_CACHE_KEY}>
      <TooltipProvider>
        <main className="flex-grow">
          {children}
          <DialogContainer />
        </main>
      </TooltipProvider>
    </QueryProvider>
  );
}
