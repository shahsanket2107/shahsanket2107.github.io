export function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const updateIcon = () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const sunIcon = toggle.querySelector('.sun-icon') as HTMLElement;
    const moonIcon = toggle.querySelector('.moon-icon') as HTMLElement;
    if (sunIcon && moonIcon) {
      sunIcon.style.opacity = isDark ? '0' : '1';
      sunIcon.style.transform = isDark ? 'rotate(90deg) scale(0)' : 'rotate(0) scale(1)';
      moonIcon.style.opacity = isDark ? '1' : '0';
      moonIcon.style.transform = isDark ? 'rotate(0) scale(1)' : 'rotate(-90deg) scale(0)';
    }
  };

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon();
  });

  updateIcon();
}
