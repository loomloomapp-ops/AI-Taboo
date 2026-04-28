import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        carbon: "#1D1D1B",
        "carbon-deep": "#0E0E0D",
        "carbon-soft": "#252523",
        bone: "#FFFFFF",
        ash: "#A8A8A6",
        "ash-dim": "#6E6E6C",
        taboo: "#DA2F36",
        "taboo-blood": "#AA1F14",
        hairline: "rgba(255,255,255,0.08)",
        "hairline-strong": "rgba(255,255,255,0.14)",
      },
      fontFamily: {
        display: ['"Akony"', '"Cabinet Grotesk"', "system-ui", "sans-serif"],
        body: ['"Involve"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Geist Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter2: "-0.035em",
      },
      borderRadius: {
        pill: "9999px",
        "card-lg": "2rem",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scan-shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
      animation: {
        marquee: "marquee 60s linear infinite",
        "marquee-rev": "marquee-rev 80s linear infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scan-shimmer": "scan-shimmer 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
