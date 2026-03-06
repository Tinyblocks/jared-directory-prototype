"use client";

import { usePathname } from "next/navigation";
import { Nav } from "./Nav";

const NO_NAV_PATHS = [
  "/trouver-mon-conseiller",
  "/recherche-ai",
];

export function NavWrapper() {
  const pathname = usePathname();
  if (NO_NAV_PATHS.some((p) => pathname?.startsWith(p))) {
    return null;
  }
  return <Nav />;
}
