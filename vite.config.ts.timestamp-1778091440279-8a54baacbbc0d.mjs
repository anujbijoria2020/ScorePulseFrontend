// vite.config.ts
import { defineConfig } from "file:///C:/web%20dev/projects/scorepulse/Client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/web%20dev/projects/scorepulse/Client/node_modules/@vitejs/plugin-react/dist/index.js";
import tailwindcss from "file:///C:/web%20dev/projects/scorepulse/Client/node_modules/@tailwindcss/vite/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "C:\\web dev\\projects\\scorepulse\\Client";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    port: 3e3,
    proxy: {
      "/api": {
        target: "https://scorepulse-bpw5.onrender.com",
        changeOrigin: true,
        secure: false,
        // Bypass SSL issues if any
        headers: {
          "Origin": "https://scorepulse-bpw5.onrender.com",
          // Spoof origin to pass Render check
          "Referer": "https://scorepulse-bpw5.onrender.com/"
        }
      },
      "/ws": {
        target: "wss://scorepulse-bpw5.onrender.com",
        ws: true,
        changeOrigin: true,
        secure: false
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx3ZWIgZGV2XFxcXHByb2plY3RzXFxcXHNjb3JlcHVsc2VcXFxcQ2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFx3ZWIgZGV2XFxcXHByb2plY3RzXFxcXHNjb3JlcHVsc2VcXFxcQ2xpZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi93ZWIlMjBkZXYvcHJvamVjdHMvc2NvcmVwdWxzZS9DbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXHJcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICdAdGFpbHdpbmRjc3Mvdml0ZSdcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIHRhaWx3aW5kY3NzKCksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogMzAwMCxcclxuICAgIHByb3h5OiB7XHJcbiAgICAgICcvYXBpJzoge1xyXG4gICAgICAgIHRhcmdldDogJ2h0dHBzOi8vc2NvcmVwdWxzZS1icHc1Lm9ucmVuZGVyLmNvbScsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsIC8vIEJ5cGFzcyBTU0wgaXNzdWVzIGlmIGFueVxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICdPcmlnaW4nOiAnaHR0cHM6Ly9zY29yZXB1bHNlLWJwdzUub25yZW5kZXIuY29tJywgLy8gU3Bvb2Ygb3JpZ2luIHRvIHBhc3MgUmVuZGVyIGNoZWNrXHJcbiAgICAgICAgICAnUmVmZXJlcic6ICdodHRwczovL3Njb3JlcHVsc2UtYnB3NS5vbnJlbmRlci5jb20vJyxcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgICcvd3MnOiB7XHJcbiAgICAgICAgdGFyZ2V0OiAnd3NzOi8vc2NvcmVwdWxzZS1icHc1Lm9ucmVuZGVyLmNvbScsXHJcbiAgICAgICAgd3M6IHRydWUsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHNlY3VyZTogZmFsc2UsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UyxTQUFTLG9CQUFvQjtBQUMxVSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUE7QUFBQSxRQUNSLFNBQVM7QUFBQSxVQUNQLFVBQVU7QUFBQTtBQUFBLFVBQ1YsV0FBVztBQUFBLFFBQ2I7QUFBQSxNQUNGO0FBQUEsTUFDQSxPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsUUFDUixJQUFJO0FBQUEsUUFDSixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
