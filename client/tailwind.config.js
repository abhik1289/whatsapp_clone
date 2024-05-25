/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily:{
        font1 : ["Kanit", "sans-serif"],
        font2 : ["Montserrat", "sans-serif"],
        font3 : ["Poetsen One", "sans-serif"],

      },
      colors: {
        dark_bg_1: "#111B21",
        dark_bg_2: "#202C33",
        dark_bg_3: "#182229",
        dark_bg_4: "#222E35",
        dark_bg_5: "#233138",
        dark_bg_6: "#101A20",
        dark_border_1: "#222D34",
        dark_border_2: "#313D45",
        dark_hover_1: "#2A3942",
        dark_svg_1: "#AEBAC1",
        dark_svg_2: "#8696A0",
        blue_1: "#53BDEB",
        blue_2: "#3E7B96",
        dark_text_1: "#E9EDEF",
        dark_text_2: "#8696A0",
        dark_text_3: "#8696a0",
        dark_text_4: "#D1D6D8",
        dark_text_5: "#99BEB7",
        dark_scrollbar: "#374045",
        green_1: "#00A884",
        green_2: "#008069",
        green_3: "#005C4B",
        green_4: "#025144",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}