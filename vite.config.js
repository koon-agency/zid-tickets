import { defineConfig } from 'vite'

export default defineConfig({
    publicDir: 'theme/assets',
    mode: 'production',
    build: {
        emptyOutDir: false,
        minify: true,
        lib: {
            emptyOutDir: false,
            entry: ["./src/app.js"],
            name: "app",
            formats: ['es'],
            fileName: (format, entryName) => `${entryName}.js`
        },
        outDir: 'theme/assets'
    }
});