import { BsFillMoonStarsFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { MdLightMode } from "react-icons/md";
import React from "react";
import { useDarkMode } from "../context/darkModeContext";
import { useHeader } from "../context/headerContext";

function Header() {
  const { customHeader } = useHeader();
  const { dark, setDark } = useDarkMode();

  const handleDark = () => {
    if (dark) {
      window.document.documentElement.classList.remove("dark");
    } else {
      window.document.documentElement.classList.add("dark");
    }
    localStorage.setItem("dark", JSON.stringify(!dark));
    setDark(!dark);
  };

  return (
    <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-gray-300 bg-transparent p-8 dark:border-secondary dark:bg-transparent">
      <Link
        to="/"
        className="flex bg-gradient-to-r from-rose-400 via-fuchsia-400 to-blue-400 bg-clip-text font-nunito text-2xl font-extrabold text-transparent"
      >
        baseurl.xyz
      </Link>
      <div className="flex items-center justify-center space-x-4">
        {customHeader}
        <button onClick={handleDark}>
          {dark ? <MdLightMode size={25} /> : <BsFillMoonStarsFill size={25} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
