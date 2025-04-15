import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended" // Agrega Prettier
  ),
  {
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": "error", // Lanza error si el código no sigue Prettier
      "react-hooks/exhaustive-deps": "warn",
      "no-console": "warn",
      "no-unused-vars": "warn",
    },
  },
];

export default eslintConfig;
