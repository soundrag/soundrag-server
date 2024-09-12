export default {
  files: ["**/*.js"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      process: "readonly",
      console: "readonly",
      __dirname: "readonly",
    },
  },
  rules: {
    "no-var": "error",
    "no-undef": "error",
    "no-unused-vars": "warn",
    "no-console": "off",
    "no-process-exit": "off",
    "global-require": "off",
  },
};
