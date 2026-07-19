"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

function resetScrollPosition() {
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  root.style.scrollBehavior = previousBehavior;
}

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    resetScrollPosition();
    const frame = requestAnimationFrame(resetScrollPosition);
    const handlePageShow = () => resetScrollPosition();
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [pathname]);

  return null;
}
