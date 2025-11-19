import Link from "next/link"

import { marketingConfig } from "@/config/landing";
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import Providers from "../a/providers";

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="z-40 bg-black dark:bg-white dark:bg-gradient">
        <div className="container">
          <div className="flex h-20 items-center justify-between py-6">
            <MainNav items={marketingConfig.mainNav} />
            <nav className="flex gap-2">
              {/* <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "px-4 dark:text-black dark:border dark:border-black dark:hover:text-white"
                )}
              >
                LOGIN
              </Link>
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "px-4 dark:text-black dark:border dark:border-black dark:hover:text-white"
                )}
              >
                SIGN UP
              </Link> */}
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Providers>{children}</Providers></main>
      <SiteFooter />
    </div>
  )
}
