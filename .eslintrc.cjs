module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["airbnb"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/jsx-indent": [
            "error",
            4
        ],
        "react/jsx-indent-props": [
            "error",
            4
        ],
        "react/jsx-no-bind": 0,
        "jsx-a11y/label-has-for": false,
        "jsx-a11y/click-events-have-key-events": false,
        "jsx-a11y/no-noninteractive-element-interactions": false,
        "jsx-a11y/no-static-element-interactions": false,
        "import/no-unresolved": [2, { ignore: ['\.png$'] }],
        "jsx-a11y/no-noninteractive-tabindex": false,
        "react/no-danger": 0,
        "max-len": [
            "error",
            { "code": 140 }
        ],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "import/no-amd": false,
        "no-continue": 0,
        "guard-for-in": 0,
        "one-var": 0,
        "no-console": 0,
        "no-restricted-syntax": 0,
        "no-alert": 0,
    },
    "globals": {
        "_": true,
        "l": true,
        "Backbone": true,
        "React": true,
        "ReactDOM": true,
        "Poster": true,
    }
};
