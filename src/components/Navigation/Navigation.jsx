import { signout } from "../../utils/Icons";
import userimg from "../../img/userimg.png";
import { menuItems } from "../../utils/menuItem";
import "./Navigation.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";

const Navigation = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useGlobalContext(); // user will now be the user object or null

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Cleanup function to ensure overflow is reset when component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]); // Add isOpen to the dependency array

  return (
    <nav className="navbar bg-[#fcf6f9c7] rounded-4xl flex flex-col gap-5">
      {/* Navbar Top Bar - Logo and Hamburger */}
      <div className="navbar-header">
        <div className="logo font-bold">Expence Tracker</div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Menu - Hidden on mobile, visible when active */}
      <div className={`nav-menu ${isOpen ? "active" : ""} flex flex-col gap-8`}>
        {user ? ( // Check if user object exists
          <div className="user-container h-28 flex items-center gap-4">
            <img
              src={userimg}
              alt=""
              className="w-20 h-20 rounded-[50%] object-cover"
            />
            <div className="user-details">
              <h2 className="font-semibold text-[24px]">{user.name}</h2>{" "}
              {/* Display user.name */}
            </div>
          </div>
        ) : (
          ""
        )}

        <ul className="menu-items flex flex-col gap-3.5">
          {menuItems.map((item) => {
            return (
              <NavLink key={item.id} to={item.link}>
                {item.icon}
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </ul>
        <div className="bottom-nav">
          {user ? ( // Check if user object exists
            <button onClick={handleLogout} className="cursor-pointer">
              {signout} Sign Out
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
