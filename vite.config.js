import { defineConfig } from "vite";

export default defineConfig({
    base: "/Kyorah/",

    server: {
        allowedHosts: ["192.168.1.106"]
    }
});