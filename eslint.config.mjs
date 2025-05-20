import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    files: [
      "pages/**/*.tsx",
      "components/**/*.tsx",
      "lib/**/*.ts",
      "context/**/*.tsx",
    ],
    ...compat.extends(
      "next/core-web-vitals",
      "next/typescript",
      "plugin:tailwindcss/recommended"
    ),
    env: {
      node: true, // Support Node.js APIs in GetServerSideProps
    },
    rules: {
      "no-console": "warn", // Warn on console.log
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ], // Allow unused vars with _
      "react-hooks/rules-of-hooks": "error", // Enforce React hooks rules
    },
  },
];

export default eslintConfig;
