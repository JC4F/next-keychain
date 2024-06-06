import { PiggyBank } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const translation = useTranslations("not_found");

  const locale = useLocale();

  return (
    <main className="flex h-[100vh] flex-col items-center justify-center gap-2">
      <PiggyBank className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">{translation("404_not_found")}</h2>
      <p>{translation("reason")}</p>
      <Link
        href={`/${locale}`}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        {translation("go_back")}
      </Link>
    </main>
  );
}
