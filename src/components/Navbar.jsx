import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-[#0b0f14] text-white border-b border-gray-800">

      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10">
            <svg viewBox="0 0 64 64" fill="none">
              <rect x="6" y="6" width="52" height="52" rx="12" fill="#d6b46d" />
              <path
                d="M18 34L32 22L46 34V48H18V34Z"
                stroke="black"
                strokeWidth="3"
              />
              <path
                d="M26 48V36H38V48"
                stroke="black"
                strokeWidth="3"
              />
            </svg>
          </div>

          <h1 className="text-[#d6b46d] font-bold text-xl">
            RentalHub
          </h1>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 text-gray-200">

          <Link to="/" className="hover:text-[#d6b46d]">Home</Link>
          <Link to="/properties" className="hover:text-[#d6b46d]">Properties</Link>

          {!user && (
            <>
              <Link to="/login" className="hover:text-[#d6b46d]">Login</Link>
              <Link to="/register" className="hover:text-[#d6b46d]">Register</Link>
            </>
          )}

          {user && (
            <>
              <Link to="/dashboard" className="hover:text-[#d6b46d]">Dashboard</Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl text-[#d6b46d]"
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-gray-200">

          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/properties">Properties</Link>

          {!user && (
            <>
              <Link onClick={() => setOpen(false)} to="/login">Login</Link>
              <Link onClick={() => setOpen(false)} to="/register">Register</Link>
            </>
          )}

          {user && (
            <>
              <Link onClick={() => setOpen(false)} to="/dashboard">Dashboard</Link>

              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="bg-red-500 px-3 py-1 rounded text-left"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;