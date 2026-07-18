import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userMenuItems } from "@/constant/navigation";
import {
  IconChevronDown,
  IconLogin2,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { getMyProfile } from "@/services/getMyProfile";
import { logoutService } from "@/services/logout";

export default async function RightSide() {
  const data = await getMyProfile();
  const user = data?.data;

  return (
    <div className="flex items-center gap-2">
      {/* User Dropdown Menu */}
      {user && (
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

            <form action={logoutService}>
              <DropdownMenuItem>
                <button
                  type="submit"
                  className="flex gap-2 items-center w-full"
                >
                  <IconLogout size={16} />
                  Logout
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* Logout Button */}
      {user === undefined && (
        <Button asChild className="hidden md:inline-flex">
          <Link href="/login">
            <IconLogin2 size={18} />
            Login
          </Link>
        </Button>
      )}

      {/* Mobile Menu */}
      <MobileNav user={user} />
    </div>
  );
}
