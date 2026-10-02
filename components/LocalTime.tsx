"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: profile.timeZone,
});

/** Current time where Arindam is. Renders after mount to avoid a hydration mismatch. */
export default function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = setInterval(update, 15_000);
    return () => clearInterval(id);
  }, []);

  return <span className={className}>{time ? `${time} IST` : " "}</span>;
}
