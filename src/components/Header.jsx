import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IconMenu2,
  IconX,
  IconSearch,
  IconInnerShadowTopRight,
  IconLayoutGrid,
} from "@tabler/icons-react";

import useAuth from "../utils/hooks/useAuth";
import noAvatar from "../assets/images/no-avatar.png";

const menu = [
  { id: crypto.randomUUID(), title: "Movies", href: "/movies" },
  { id: crypto.randomUUID(), title: "TV shows", href: "/tvshows" },
  { id: crypto.randomUUID(), title: "Animations", href: "/animations" },
  { id: crypto.randomUUID(), title: "Plans", href: "/plans" },
];

export const Header = () => {
  const location = useLocation();
  const { fetchDeleteSession } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    fetchDeleteSession();
  };

  return (
    <header className="text-white p-6 md:px-11 md:pt-11 flex items-center justify-between border-b border-lightGrey bg-major z-10 relative">
      <div className="md:flex items-start gap-24 lg:gap-52 ">
        <h1 className="text-lg font-axiforma-bold z-[10]">
          <Link to="/movies">LinkChar</Link>
          <div className="h-1 bg-gradient-to-r from-pink-500 to-red-500" />
        </h1>
        <div
          className="cursor-pointer md:hidden absolute top-6 right-5"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IconX /> : <IconMenu2 />}
        </div>
        <ul
          className={`flex flex-col md:flex-row items-center gap-y-4 md:gap-12 lg:gap-24 pb-4 md:pb-0 absolute md:static bg-major z-[1] md:z-auto left-0 w-full md:w-auto transition-all duration-500 ease-in ${
            isOpen ? "top-16" : "top-[-490px]"
          }`}
        >
          {menu.map(({ id, title, href }) => (
            <li
              key={id}
              className={`${
                location.pathname === href ? "text-white" : "text-off"
              }`}
            >
              <Link
                className="text-sm hover:text-base transition-all duration-150 ease-in"
                to={href}
                onClick={() => setIsOpen(false)}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden md:flex md:items-center md:gap-5">
        <IconSearch />
        <IconInnerShadowTopRight />
        <IconLayoutGrid />
        <div className="w-8 h-8 grup">
          <img src={noAvatar} alt="noavatar" />
          <div>
            <button
              type="button"
              className="bg-green-700 hidden md:block"
              onClick={handleLogOut}
            >
              cerrar sesion
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
