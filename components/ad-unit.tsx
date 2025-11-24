/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { useEffect } from "react";

type AdUnitProps = {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  className?: string;
};

export function AdUnit({ slot, format = "auto", className }: AdUnitProps) {
  useEffect(() => {
    try {
      // @ts-expect-error
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`overflow-hidden text-center my-6 ${className}`}>
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 block">Advertisement</span>
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-YOUR_PUBLISHER_ID_HERE" // <--- REPLACE THIS LATER
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
        />
    </div>
  );
}