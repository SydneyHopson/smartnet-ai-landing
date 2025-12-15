// src/components/shared/language-switcher.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (locale: string) => {
    startTransition(() => {
      router.push(`/${locale}${pathname}`);
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        onClick={() => handleLocaleChange("en")}
        disabled={isPending}
        className="text-xs text-white hover:text-emerald-300"
      >
        🇺🇸 EN
      </Button>
      <Button
        variant="ghost"
        onClick={() => handleLocaleChange("es")}
        disabled={isPending}
        className="text-xs text-white hover:text-emerald-300"
      >
        🇪🇸 ES
      </Button>
    </div>
  );
}
