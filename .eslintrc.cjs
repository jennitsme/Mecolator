module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "plugin:import/recommended",
    "plugin:n/recommended",
    "prettier",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/filename-case": "off",
    "n/no-unsupported-features/es-syntax": "off",
    "n/no-missing-import": "off",
    "import/no-unresolved": "off",
  },
};
