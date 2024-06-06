"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Hint,
  buttonVariants,
} from "@/components";
import { cn, usePathname, useRouter } from "@/lib";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";

export function LocaleToggle() {
  const translation = useTranslations("home");
  const pathName = usePathname();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Hint label="Language" theme="dark">
          <span
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
          >
            <Languages className="h-5 w-5" />
          </span>
        </Hint>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push(pathName, { locale: "en" })}
        >
          {translation("english")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(pathName, { locale: "vn" })}
        >
          {translation("vietnamese")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
