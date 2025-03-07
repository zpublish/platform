import Link from "next/link"

import { marketingConfig } from "@/config/landing";
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="z-40 bg-black dark:bg-background">
        <div className="container">
          <div className="flex h-20 items-center justify-between py-6">
            <MainNav items={marketingConfig.mainNav} />
            <nav>
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "px-4 dark:text-secondary"
                )}
              >
                SIGN UP
              </Link>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "px-4 dark:text-secondary"
                )}
              >
                LOGIN
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
