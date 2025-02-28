import React from "react";
import { NavLink } from "react-router";

const Navigation = () => {
  return (
    <div className="flex justify-center gap-10">
      <NavLink
        className="bg-amber-400 px-10 py-2 rounded-full font-bold hover:text-white hover:border-2"
        to="/skriva"
      >
        Skriva
      </NavLink>

      <NavLink
        className="bg-amber-400 px-10 py-2 rounded-full font-bold hover:text-white hover:border-2"
        to="/lasa"
      >
        Läsa
      </NavLink>
    </div>
  );
};

export default Navigation;
