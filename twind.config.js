export default {
    theme: {
        extend: {
            colors: {
                primary: '#1e40af',
                secondary: '#9333ea',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: 0, transform: 'translateY(8px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
            },
            animation: {
                fadeUp: 'fadeUp 0.8s ease-out forwards',
            },
        },
    }
}