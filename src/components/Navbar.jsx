import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {

  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");

  };

 const linkStyle = ({ isActive }) =>

    `px-3 py-1 rounded-md transition-all duration-300 ${
      isActive
        ? "bg-[#d6b46d] text-black"
        : "text-gray-200 hover:bg-[#d6b46d] hover:text-black"
    }`;

 return (

 <nav className="bg-[#050b14] border-b border-[#1f2937]">

    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
    <div className="flex items-center gap-3">
    <div className="w-10 h-10">
    <svg viewBox="0 0 64 64" fill="none">
    <rect x="6" y="6" width="52" height="52" rx="12" fill="#d6b46d" />
    <path d="M18 34L32 22L46 34V48H18V34Z" stroke="black" strokeWidth="3" />
    <path d="M26 48V36H38V48" stroke="black" strokeWidth="3" />
    </svg>

  </div>

   <h1 className="text-[#d6b46d] font-bold text-xl"> RentalHub </h1>

 </div>

  <div className="hidden md:flex items-center gap-4">

    <NavLink to="/" className={linkStyle}>  Home  </NavLink>
    <NavLink to="/properties" className={linkStyle}>  Properties </NavLink>

   {!user && (
     <>
   <NavLink to="/login" className={linkStyle}> Login </NavLink>
   <NavLink to="/register" className={linkStyle}>  Register  </NavLink>
   </>

   )}

   {user && (
    <>
   <NavLink to="/dashboard" className={linkStyle}> Dashboard </NavLink>

     <button
       onClick={handleLogout}
      className="bg-red-500 px-3 py-1 rounded text-white hover:opacity-80 transition" > Logout </button>
   </>

 )}

</div>

 <button
   onClick={() => setOpen(!open)}
  className="md:hidden text-3xl text-[#d6b46d]"
 >
   ☰
</button>

  </div>

  
{open && (
 <div className="md:hidden px-4 pb-4 flex flex-col gap-3">

 <NavLink onClick={() => setOpen(false)} to="/" className={linkStyle}> Home </NavLink>
 <NavLink onClick={() => setOpen(false)} to="/properties" className={linkStyle}> Properties </NavLink>

 {!user && (
     <>
 <NavLink onClick={() => setOpen(false)} to="/login" className={linkStyle}> Login </NavLink>
 <NavLink onClick={() => setOpen(false)} to="/register" className={linkStyle}> Register </NavLink>
   </>

 )}

 {user && (
   <>
 <NavLink onClick={() => setOpen(false)} to="/dashboard" className={linkStyle}> Dashboard </NavLink>

 <button
    onClick={() => {
   setOpen(false);
   handleLogout();
   }}
 className="bg-red-500 px-3 py-1 rounded text-white text-left" > Logout </button>
 </>

   )}

 </div>

 )}

 </nav>
 
  );
};

export default Navbar;