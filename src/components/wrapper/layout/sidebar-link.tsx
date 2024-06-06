import { LucideProps } from "lucide-react";
import Link from "next/link";
import React from "react";

type SidebarLinkProps = {
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  > &
    JSX.IntrinsicElements;
  title: string;
};

export const SidebarLink = ({ Icon, title }: SidebarLinkProps) => {
  return (
    <Link
      href="#"
      className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
    >
      <Icon className="h-4 w-4 transition-all group-hover:scale-110" />
      <span className="sr-only">{title}</span>
    </Link>
  );
};
