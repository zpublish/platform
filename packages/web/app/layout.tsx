import { Inter as FontSans, IBM_Plex_Mono as IBMPlexMono } from "next/font/google"
// import localFont from "next/font/local"

import "@/styles/globals.css"

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster"
// import { Analytics } from "@/components/analytics"
// import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";
import Providers from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = IBMPlexMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "500", "600", "700"],
});

// Font files can be colocated inside of `pages`
// const fontHeading = localFont({
//   src: "../assets/fonts/CalSans-SemiBold.woff2",
//   variable: "--font-heading",
// })

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // keywords: [
  //   "Next.js",
  //   "React",
  //   "Tailwind CSS",
  //   "Server Components",
  //   "Radix UI",
  // ],
  // authors: [
  //   {
  //     name: "",
  //     url: "https://.com",
  //   },
  // ],
  // creator: "",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    // creator: "@",
  },
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/ico",
        url: "/favicon.ico",
        sizes: "16x16",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/icons/favicon16.png",
        sizes: "16x16",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/icons/favicon32.png",
        sizes: "32x32",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/icons/favicon96.png",
        sizes: "96x96",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/icons/favicon192.png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/icons/favicon512.png",
        sizes: "512x512",
      },
    ],
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased dark:bg-black",
          fontSans.variable,
          fontMono.variable,
          // fontHeading.variable
        )}
      >
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            {/* <Analytics /> */}
            <Suspense>
              <Toaster />
            </Suspense>
            {/* <TailwindIndicator /> */}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}