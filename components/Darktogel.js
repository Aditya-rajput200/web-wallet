// components/DarkModeToggle.js
import { useDarkMode } from '../context/darkmode';

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="bg-gray-300 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-md shadow-md"
    >
      {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
}
