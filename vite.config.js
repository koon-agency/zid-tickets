import { defineConfig } from 'vite'

export default defineConfig({
    publicDir: 'theme/assets',
    mode: 'production',
    emptyOutDir: false,
    build: {
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