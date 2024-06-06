"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components";
import { useLocale, useTranslations } from "next-intl";

const Error = () => {
  const translation = useTranslations("error");
  const locale = useLocale();

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/error.png"
        height="300"
        width="300"
        alt="Error"
        className="dark:hidden"
      />
      <Image
        src="/error-dark.png"
        height="300"
        width="300"
        alt="Error"
        className="hidden dark:block"
      />
      <h2 className="text-xl font-medium">{translation("something_wrong")}</h2>
      <Button asChild>
        <Link href={`/${locale}`}>{translation("go_back")}</Link>
      </Button>
    </div>
  );
};

export default Error;
