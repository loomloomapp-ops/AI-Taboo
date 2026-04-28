import Image from "next/image";

export function Logo({ variant = "wordmark", className = "" }: { variant?: "wordmark" | "mark"; className?: string }) {
  const src = variant === "mark" ? "/logo/taboo-mark-white.png" : "/logo/taboo-wordmark-white.png";
  const w = variant === "mark" ? 36 : 130;
  const h = 36;
  return (
    <Image
      src={src}
      alt="Taboo Traffic Agency"
      width={w}
      height={h}
      priority
      className={className}
      style={{ width: "auto", height: variant === "mark" ? 32 : 28 }}
    />
  );
}
