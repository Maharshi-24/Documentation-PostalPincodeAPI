import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  // Only run if the user hasn't set a preference yet
  if (!localStorage.getItem('theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = prefersDark ? 'dark' : 'light';
    
    // Set the attribute and localStorage
    document.documentElement.setAttribute('data-theme', initialTheme);
    localStorage.setItem('theme', initialTheme);
  }
}
