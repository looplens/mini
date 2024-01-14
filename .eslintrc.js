module.exports = {
  root: true,
  extends: ["universe/native", "prettier"],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    semi: ["error", "never"],
    quotes: ["error", "double"],
    "eslint-disable-next-line": 0,
    "prettier/prettier": 0,
    "react-hooks/rules-of-hooks": 0,
  },
}
