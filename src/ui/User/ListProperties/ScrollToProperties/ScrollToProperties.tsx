// components/ScrollToProperties.tsx
"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const ScrollToProperties = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("scrollToResults");

    if (shouldScroll === "true") {
      const section = document.getElementById("properties");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }

      sessionStorage.removeItem("scrollToResults");
    }
  }, [searchParams.toString()]);

  return null;
};
