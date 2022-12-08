const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    theme: {
        extend: {
            gridTemplateRows: {
                '[auto,auto,1fr]': 'auto auto 1fr',
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
              },
        },
    },
    plugins: [
        // ...
        require('@tailwindcss/aspect-ratio'),
    ],
}