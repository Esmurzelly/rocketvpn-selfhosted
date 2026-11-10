"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";

export function useAnchorClick(onAfter?: () => void) {
  const pathname = usePathname();

  return (e: MouseEvent<HTMLAnchorElement>, url: string) => {
    onAfter?.();

    const [path, hash] = url.split("#");
    if (!hash || pathname !== (path || "/")) return;

    const el = document.getElementById(hash);
    if (!el) return;

    e.preventDefault();

    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", url);
    });
  };
}