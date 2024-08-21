// components/DarkModeToggle.js
import { useDarkMode } from '../../context/darkmode';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="bg-gray-300 absolute top-2 right-2 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-md shadow-md"
    >
      {isDarkMode ? <MdOutlineDarkMode /> : <MdDarkMode />}
    </button>
  );
}
