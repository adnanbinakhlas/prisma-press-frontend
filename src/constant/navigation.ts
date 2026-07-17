import { IconBook2, IconUser, type Icon } from "@tabler/icons-react";

export const navigation = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "News",
    href: "/news",
  },
];

export type UserMenuItem = {
  title: string;
  href: string;
  icon: Icon;
};

export const userMenuItems: UserMenuItem[] = [
  {
    title: "My Profile",
    href: "/dashboard/profile",
    icon: IconUser,
  },
  {
    title: "My News",
    href: "/dashboard/news",
    icon: IconBook2,
  },
];
