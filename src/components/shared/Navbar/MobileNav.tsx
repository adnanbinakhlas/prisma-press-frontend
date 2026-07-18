"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navigation, userMenuItems } from "@/constant/navigation";
import { cn } from "@/lib/utils";
import { logoutService } from "@/services/logout";
import { TUser } from "@/types/user";
import {
  IconBook2,
  IconLogin2,
  IconLogout,
  IconMenu2,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav({ user }: { user: TUser | undefined }) {
  const pathname = usePathname();

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const handleLogout = async (): Promise<void> => {
    await logoutService();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <IconMenu2 size={22} />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[320px]">
        <div className="mt-8 flex flex-col px-8">
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
            {user && (
              <>
                <div className="mb-4">
                  <p className="font-medium">{user.name}</p>

                  <p className="text-xs text-muted-foreground">{user.email}</p>
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
                    onClick={handleLogout}
                  >
                    <IconLogout size={18} />
                    Logout
                  </Button>
                </div>
              </>
            )}
            {user === undefined && (
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
  );
}
