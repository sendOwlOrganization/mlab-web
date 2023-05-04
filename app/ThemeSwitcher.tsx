"use client";

// FIXME: temporary solution
export const ThemeSwitcher = () => {
  const toggleTheme = () => {
    const html = document.querySelector("html");
    if (!html) return;

    const isDark = html.classList.contains("light");
    html.classList.toggle("light", !isDark);
    html.classList.toggle("dark", isDark);
  };

  return <button onClick={() => toggleTheme()}>theme</button>;
};
