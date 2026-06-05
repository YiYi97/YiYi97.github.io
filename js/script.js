/**
 * 个人博客脚本 - YiYi97
 * 处理深色/浅色模式切换等交互功能
 */

(function () {
    'use strict';

    // ========== 主题切换 ==========
    const THEME_KEY = 'blog-theme';
    const themeToggle = document.getElementById('themeToggle');

    // 获取系统颜色偏好
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // 获取当前主题
    function getTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === 'dark' || saved === 'light') return saved;
        return getSystemTheme();
    }

    // 应用主题
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // 切换主题
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
    }

    // 初始化主题
    applyTheme(getTheme());

    // 绑定切换按钮
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ========== 当前页面高亮导航 ==========
    function highlightCurrentNav() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            if (href && currentPath.endsWith(href.replace(/^\.\.\//, ''))) {
                link.classList.add('active');
            }
        });
    }
    highlightCurrentNav();
})();
