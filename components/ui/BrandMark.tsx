import Image from "next/image";

const sizes = {
  flower: { w: 500, h: 500 },
  "arrow-up": { w: 500, h: 500 },
  "arrow-down": { w: 500, h: 500 },
  blob: { w: 500, h: 500 },
  hatch: { w: 500, h: 500 },
  comet: { w: 500, h: 500 },
  teeth: { w: 500, h: 500 },
  exclaim: { w: 500, h: 500 },
  star: { w: 500, h: 500 },
  "curve-left": { w: 500, h: 500 },
  "curve-right": { w: 500, h: 500 },
  circle: { w: 500, h: 500 },
  hearts: { w: 500, h: 500 },
  strokes: { w: 500, h: 500 },
  zigzag: { w: 500, h: 500 },
  cross: { w: 500, h: 500 },
  check: { w: 500, h: 500 },
} as const;

export type BrandMarkName = keyof typeof sizes;

export function BrandMark({
  name,
  className = "",
  size = 64,
  alt = "",
  rotate,
  opacity,
}: {
  name: BrandMarkName;
  className?: string;
  size?: number;
  alt?: string;
  rotate?: number;
  opacity?: number;
}) {
  const s = sizes[name];
  return (
    <Image
      src={`/brand/${name}.png`}
      alt={alt}
      width={s.w}
      height={s.h}
      className={className}
      style={{
        width: size,
        height: size,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        opacity,
      }}
      aria-hidden={alt === ""}
    />
  );
}
