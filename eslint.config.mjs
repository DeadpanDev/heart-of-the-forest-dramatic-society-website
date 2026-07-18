import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "prettier";
import eslintConfig from "eslint-config-prettier";
import eslintPlugin from "eslint-plugin-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:w
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  prettier,
  eslintConfig,
  {
    plugins: { prettier: eslintPlugin },
    rules: {
      "prettier/prettier": "error",
    },
  },
]);

export default eslintConfig;
