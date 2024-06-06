import { Link } from "@/lib";
import { Menu, Search, Settings } from "lucide-react";
import { LocaleToggle, ThemeToggle, UserNav } from "../../custom";
import {
  Badge,
  Button,
  Input,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../ui";
import { topLinks } from "./main-layout-v2";

export const Header = () => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
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
      <ThemeToggle />
      <LocaleToggle />
      <UserNav />
    </header>
  );
};
