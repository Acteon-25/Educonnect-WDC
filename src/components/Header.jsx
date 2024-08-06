import { NavLink, useNavigate, Link } from "react-router-dom";
import Logo from "../icons/Logo.png";
import LineDrop from "../icons/LineDrop.svg";
import Equis from "../icons/Equis.svg";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };
  const navigate = useNavigate();

  return (
    <header className="flex flex-col md:flex-row justify-between items-center py-4 w-full mx-auto bg-gradient-to-r from-green-700 to-blue-500 bg-opacity-75 px-5">
      <div className={`flex justify-between items-center w-full md:w-auto ${menuOpen ? 'px-5 fixed md:relative' : ''}`}>
        <Link to="/">
          <img src={Logo} alt="Logo" className="rounded-full w-12 h-12" />
        </Link>
        {menuOpen ? <img
          src={Equis}
          alt="Menu"
          className="w-12 h-12 cursor-pointer mx-2 md:hidden block"
          onClick={handleClick}
        /> : <img
          src={LineDrop}
          alt="Menu"
          className="w-12 h-12 cursor-pointer mx-2 md:hidden block"
          onClick={handleClick}
        />}

      </div>
      <nav
        className={`
          flex-col items-center pt-2
          gap-x-10 transition-all ease-in duration-500 
          md:flex-row md:flex md:items-center 
          ${menuOpen ? "flex" : "hidden"
          } md:flex`}
      >
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-green-500/70 py-1 px-5 mx-auto rounded-xl text-white"
              : "text-white hover:bg-green-600 py-1 px-5 mx-auto rounded-xl"
          }
          to="/"
        >
          Inicio
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-green-500/70 py-1 px-5 mx-auto rounded-xl text-white"
              : "text-white hover:bg-green-600 py-1 px-5 mx-auto rounded-xl"
          }
          to="/nosotros"
        >
          Nosotros
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "bg-green-500/70 py-1 px-5 mx-auto rounded-xl text-white"
              : "text-white hover:bg-green-600 py-1 px-5 mx-auto rounded-xl"
          }
          to="/pricing"
        >
          Precios
        </NavLink>
        <button
          className="text-white bg-yellow-500 hover:bg-yellow-600 py-1 px-5 mx-auto rounded-xl"
          onClick={() => {
            navigate("/login");
          }}
        >
          Iniciar sesión
        </button>
      </nav>
    </header>
  );
};

export default Header;
