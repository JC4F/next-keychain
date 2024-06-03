"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components";
import { AvatarProps } from "@radix-ui/react-avatar";
import { UserIcon } from "lucide-react";
import { User } from "next-auth/types";

interface UserAvatarProps extends AvatarProps {
  user: User;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage className="shadow-lg" alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback className="bg-background shadow-lg">
          <span className="sr-only">{user.name}</span>
          <UserIcon className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
