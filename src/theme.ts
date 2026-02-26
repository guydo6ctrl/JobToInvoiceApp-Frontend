import { createSystem, defaultConfig } from "@chakra-ui/react";

const customConfig = {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#eef4ff" },
          100: { value: "#d9e4ff" },
          200: { value: "#b3c7ff" },
          300: { value: "#8ca9ff" },
          400: { value: "#668cff" },
          500: { value: "#3f6fff" }, 
          600: { value: "#3157cc" },
          700: { value: "#243f99" },
          800: { value: "#182866" },
          900: { value: "#0c1433" },
        },

        gray: {
          50: { value: "#f9fafb" },
          100: { value: "#f3f4f6" },
          200: { value: "#e5e7eb" },
          300: { value: "#d1d5db" },
          400: { value: "#9ca3af" },
          500: { value: "#6b7280" },
          600: { value: "#4b5563" },
          700: { value: "#374151" },
          800: { value: "#1f2937" },
          900: { value: "#111827" },
        },
      },

      radii: {
        sm: { value: "6px" },
        md: { value: "10px" },
        lg: { value: "14px" },
        xl: { value: "18px" },
      },

      shadows: {
        sm: { value: "0 1px 2px rgba(0,0,0,0.04)" },
        md: { value: "0 4px 12px rgba(0,0,0,0.06)" },
        lg: { value: "0 10px 25px rgba(0,0,0,0.08)" },
      },
    },

    semanticTokens: {
      colors: {
        primary: { value: "{colors.brand.500}" },
        primaryHover: { value: "{colors.brand.600}" },
        border: { value: "{colors.gray.200}" },
        subtleBg: { value: "{colors.gray.50}" },

      },
    },
    components: {
      Button: {
        baseStyle: {
          fontWeight: "600",
          borderRadius: "md",
          transition: "all 0.15s ease",
          _active: {
            transform: "scale(0.98)",
          },
        },
        variants: {
          solid: {
            bg: "brand.500",
            color: "white",
            _hover: { bg: "brand.600" },
          },
          subtle: {
            bg: "gray.100",
            color: "gray.800",
            _hover: { bg: "gray.200" },
          },
          outline: {
            border: "1px solid",
            borderColor: "gray.300",
            color: "gray.700",
            _hover: { bg: "gray.50" },
          },
          danger: {
            bg: "red.500",
            color: "white",
            _hover: { bg: "red.600" },
          },
        },
        defaultProps: {
          variant: "solid",
        },
      },
    },
  },
};


export const system = createSystem(defaultConfig, customConfig);