"use client";

import { ROLE } from "@/constants";
import { useGlobalStore } from "@/hooks";
import {
  Bell,
  Home,
  LucideProps,
  Menu,
  Package,
  Package2,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import { Session } from "next-auth/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { UserNav } from "../custom";
import {
  Badge,
  Button,
  Input,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui";

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

const topLinks: SidebarLink[] = [
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

  if (pathname === "/404") return <>{children}</>;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Acme Inc</span>
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
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                {topLinks.map(({ Icon, ...item }, index) => (
                  <Link
                    key={index}
                    href={item.path}
                    className="flex items-center gap-2 text-lg font-semibold"
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
              <div className="mt-auto">
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <UserNav />
        </header>
        <ScrollArea className="h-[calc(100vh-60px)] w-[100vw] md:w-[calc(100vw-280px)] rounded-md p-4 lg:gap-6 lg:p-6">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
