"use client";

import { ROLE } from "@/constants";
import { useGlobalStore } from "@/hooks";
import {
  Bell,
  Home,
  LucideProps,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import { Session } from "next-auth/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { ConfirmDialog } from "../../custom";
import { Badge, Button } from "../../ui";
import { Header } from "./header";

type SidebarLink = {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  > &
    JSX.IntrinsicElements;
  title: string;
  path: string;
  notifications?: number;
  role: ROLE[];
};

export const topLinks: SidebarLink[] = [
  {
    Icon: Home as any,
    title: "Dashboard",
    path: "/dashboard",
    role: [ROLE.ADMIN],
  },
  {
    Icon: ShoppingCart,
    title: "Orders",
    path: "/order",
    role: [],
  },
  {
    Icon: Package,
    title: "Products",
    path: "/product",
    role: [ROLE.ADMIN],
  },
  {
    Icon: Users2,
    title: "Customers",
    path: "/customer",
    role: [ROLE.ADMIN],
  },
];

type MainLayoutV2Props = {
  session: Session | null;
};

export function MainLayoutV2({
  children,
  session,
}: PropsWithChildren<MainLayoutV2Props>) {
  const pathname = usePathname();
  const { data, setData } = useGlobalStore();

  useEffect(() => {
    setData({ user: session?.user });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (pathname === "/not-found") return <>{children}</>;

  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="">Pi Pi</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {topLinks.map(({ Icon, ...item }, index) => (
                  <Link
                    key={index}
                    href={item.path}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                    {item.notifications && (
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        {item.notifications}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="mt-auto p-4">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <Header />
          <div className="h-[calc(100vh-60px)] w-[100vw] md:w-[calc(100vw-280px)] rounded-md p-4 lg:gap-6 lg:p-6 overflow-auto">
            {children}
          </div>
        </div>
      </div>
      <ConfirmDialog />
    </>
  );
}
