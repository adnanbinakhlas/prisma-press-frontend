import Navbar from "@/components/shared/Navbar/Navbar";
import { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <section className="grow">{children}</section>
    </main>
  );
}
