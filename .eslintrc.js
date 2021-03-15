module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    extends: "airbnb",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
        "react/no-array-index-key": "off",
        "no-console": "off",
        "react/no-unused-prop-types": "off",
        "import/no-cycle": "off",
        "no-shadow": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "react/destructuring-assignment": "off",
        "react/require-default-props": "off",
        "no-restricted-globals": "off"
    }
};
