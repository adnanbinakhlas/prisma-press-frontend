"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  IconBook2,
  IconChevronDown,
  IconLogin2,
  IconLogout,
  IconMenu2,
  IconUserCircle,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navigation, userMenuItems } from "@/constant/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const user = {
    name: "Adnan Bin Akhlas",
    email: "adnan@example.com",
  };

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

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
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                isActiveRoute(item.href)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden gap-2 md:flex">
                  <IconUserCircle size={20} />

                  <span className="max-w-35 truncate">{user.name}</span>

                  <IconChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-64">
                <div className="px-3 py-2">
                  <p className="font-medium">{user.name}</p>

                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>

                <DropdownMenuSeparator />

                {userMenuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>
                        <Icon size={16} />
                        {item.title}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <IconLogout size={16} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="hidden md:inline-flex">
              <Link href="/login">
                <IconLogin2 size={18} />
                Login
              </Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <IconMenu2 size={22} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[320px]">
              <div className="mt-8 flex flex-col">
                {/* Mobile Logo */}
                <div className="mb-6 flex items-center gap-3 border-b pb-4">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <IconBook2 size={20} />
                  </div>

                  <div>
                    <h2 className="font-semibold">Prisma Press</h2>

                    <p className="text-xs text-muted-foreground">
                      Modern Blogging Platform
                    </p>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block rounded-md px-4 py-3 text-sm font-medium transition-colors",
                        isActiveRoute(item.href)
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>

                <div className="mt-6 border-t pt-6">
                  {user ? (
                    <>
                      <div className="mb-4">
                        <p className="font-medium">{user.name}</p>

                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>

                      <div className="space-y-2">
                        {userMenuItems.map((item) => {
                          const Icon = item.icon;

                          return (
                            <Button
                              key={item.href}
                              asChild
                              variant="outline"
                              className="w-full justify-start"
                            >
                              <Link href={item.href}>
                                <Icon size={18} />
                                {item.title}
                              </Link>
                            </Button>
                          );
                        })}

                        <Button
                          variant="destructive"
                          className="w-full justify-start"
                        >
                          <IconLogout size={18} />
                          Logout
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button asChild className="w-full">
                      <Link href="/login">
                        <IconLogin2 size={18} />
                        Login
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
