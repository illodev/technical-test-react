import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import { CustomThemeProvider } from "@/providers/custom-theme-provider";
import { ThemeProvider } from "@/providers/theme-provider";

import "@/styles/globals.css";
import "@/styles/themes.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ["react", "typescript", "nextjs", "tailwindcss", "next-auth"],
  authors: [
    {
      name: "illodev",
      url: "https://illodev.com",
    },
  ],
  creator: "illodev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-icon.png",
  },
  manifest: `${siteConfig.url}/manifest.json`,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CustomThemeProvider>
            <div className="min-h-screen flex flex-col">
              <Header user={session?.user} />
              {children}
              <Footer />
            </div>
            <Toaster />
          </CustomThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
