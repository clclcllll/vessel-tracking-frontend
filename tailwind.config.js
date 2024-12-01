/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // 如果使用 Vite
    "./src/**/*.{vue,js,ts,jsx,tsx}", // 包括 Vue 和相关文件
  ],
  theme: {
    extend: {
      colors: {
        // 自定义颜色风格，体现石油运输主题
        primary: "#1b3a57", // 深蓝，主色调，适合导航栏和标题
        secondary: "#f4a261", // 沙漠橙色，用于按钮和重点区域
        accent: "#2a9d8f", // 青绿色，辅助色，用于图表或边界线
        background: "#f4f5f7", // 浅灰色背景，提升可读性
        highlight: "#e76f51", // 红褐色，用于警告或紧急状态
      },
      fontFamily: {
        // 定制字体，适合行业感
        sans: ["Inter", "Arial", "sans-serif"],
        mono: ["Courier New", "monospace"],
      },
      boxShadow: {
        // 增强界面层次感的阴影
        card: "0 4px 8px rgba(0, 0, 0, 0.1)",
        map: "0 8px 16px rgba(0, 0, 0, 0.15)",
        panel: "0 2px 4px rgba(0, 0, 0, 0.05)",
      },
      spacing: {
        // 定制间距，适合布局调整
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      screens: {
        // 自定义断点，适应可视化系统的需求
        '2xl': '1440px', // 专为大屏设计的布局优化
      },
      animation: {
        // 专用动画，例如加载和地图元素动态效果
        fadeIn: "fadeIn 1.5s ease-in-out",
        bounceSlow: "bounce 3s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    // 增强表单样式，适合系统的交互需求
    require("@tailwindcss/forms"),
    // 增强滚动条设计，适合数据展示
    require("tailwind-scrollbar"),
    // 自定义渐变插件
    require("@tailwindcss/typography"),
  ],
};
