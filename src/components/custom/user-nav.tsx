"use client";

import { login, logout } from "@/actions";
import { useGlobalStore } from "@/hooks";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui";
import { UserAvatar } from "./user-avatar";

export const UserNav = () => {
  const {
    data: { user },
    setData,
  } = useGlobalStore();

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar user={user} className="h-8 w-8" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{user.name}</p>
                <p className="w-[200px] truncate text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout();
                setData({ user: undefined });
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="ghost" size="sm" onClick={() => login()}>
          Login
        </Button>
      )}
    </>
  );
};
