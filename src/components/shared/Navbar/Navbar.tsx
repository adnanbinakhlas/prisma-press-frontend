import Link from "next/link";

import { IconBook2 } from "@tabler/icons-react";

import DesktopNav from "./DesktopNav";
import RightSide from "./RightSide";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <IconBook2 size={20} />
          </div>

          <div className="hidden sm:block">
            <h1 className="text-sm font-bold leading-none">Prisma Press</h1>

            <p className="mt-1 text-xs text-muted-foreground">
              Modern Blogging Platform
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav />

        {/* Right Side */}
        <RightSide />
      </div>
    </header>
  );
}
