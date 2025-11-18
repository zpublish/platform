'use client'

import { ZecPagesProvider } from "@/context/ZecPagesContext"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ZecPagesProvider>{children}</ZecPagesProvider>
  );
}
