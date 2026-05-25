/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // BẮT BUỘC THÊM DÒNG NÀY
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface-tint": "#e9c400",
        "primary-fixed-dim": "#e9c400",
        "on-error-container": "#ffdad6",
        "on-surface": "#e5e2e1",
        "secondary-fixed-dim": "#00e38b",
        "surface-container-low": "#1c1b1b",
        "surface-container-high": "#2a2a2a",
        "surface-variant": "#353534",
        "on-primary-fixed-variant": "#544600",
        "secondary-fixed": "#56ffa8",
        "on-primary": "#3a3000",
        "surface-bright": "#3a3939",
        "on-secondary-fixed": "#002110",
        "on-background": "#e5e2e1",
        "on-primary-fixed": "#221b00",
        "on-surface-variant": "#d0c6ab",
        "secondary": "#f5fff4",
        "on-tertiary-fixed": "#410004",
        "inverse-surface": "#e5e2e1",
        "surface": "#131313",
        "tertiary": "#fff3f2",
        "inverse-primary": "#705d00",
        "on-secondary-fixed-variant": "#00522f",
        "primary-fixed": "#ffe16d",
        "on-secondary": "#00391f",
        "surface-container-highest": "#353534",
        "outline": "#999077",
        "surface-dim": "#131313",
        "outline-variant": "#4d4732",
        "surface-container": "#201f1f",
        "on-tertiary": "#68000b",
        "tertiary-container": "#ffceca",
        "background": "#131313",
        "surface-container-lowest": "#0e0e0e",
        "on-error": "#690005",
        "on-primary-container": "#705e00",
        "error-container": "#93000a",
        "on-tertiary-fixed-variant": "#930014",
        "on-tertiary-container": "#bb1824",
        "tertiary-fixed": "#ffdad7",
        "primary-container": "#ffd700",
        "tertiary-fixed-dim": "#ffb3ae",
        "inverse-on-surface": "#313030",
        "primary": "#fff6df",
        "secondary-container": "#16ff9e",
        "on-secondary-container": "#007243",
        "error": "#ffb4ab"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "margin": "24px",
        "stack_medium": "12px",
        "stack_compact": "4px",
        "grid_columns": "12",
        "gutter": "12px",
        "stack_large": "24px"
      },
      fontFamily: {
        sans: ['"Josefin Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        "data-md": ["JetBrains Mono"],
        "label-sm": ["JetBrains Mono"],
        "display-lg": ["Inter"],
        "body-md": ["Inter"],
        "data-lg": ["JetBrains Mono"],
        "headline-md": ["Inter"]
      },
      fontSize: {
        "data-md": ["12px", { "lineHeight": "16px", "letterSpacing": "0", "fontWeight": "500" }],
        "label-sm": ["10px", { "lineHeight": "12px", "letterSpacing": "0.05em", "fontWeight": "600" }],
        "display-lg": ["36px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "body-md": ["13px", { "lineHeight": "20px", "letterSpacing": "0", "fontWeight": "400" }],
        "data-lg": ["16px", { "lineHeight": "24px", "letterSpacing": "-0.01em", "fontWeight": "500" }],
        "headline-md": ["20px", { "lineHeight": "28px", "letterSpacing": "0.01em", "fontWeight": "600" }]
      }
    },
  },
  plugins: [],
}// trigger reload
