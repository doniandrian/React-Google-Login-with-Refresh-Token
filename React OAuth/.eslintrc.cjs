
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "react", "prettier"],
  rules: {
    "react/react-in-jsx-scope": 0,
    "import/no-absolute-path": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "react/button-has-type": 0,
    "no-underscore-dangle": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/control-has-associated-label": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "no-plusplus": 0,
    "react/jsx-props-no-spreading": 0,
    "react/require-default-props": 0,
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0, 
    "react/no-danger": 0,
    "linebreak-style": ["error", "windows"],

    
    "import/first": 0, 
    "no-console": "off", 
    "no-alert": "off", 
    "@typescript-eslint/naming-convention": "off", 
  },
};
