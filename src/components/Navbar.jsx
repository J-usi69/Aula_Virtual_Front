import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();         
    navigate("/");   
  };

  const photoUrl = user?.photo
    ? `http://localhost:3000/api/users/uploads/${user.photo}`
    : null;

  return (
    <div className="fixed top-0 left-0 w-full z-30 flex justify-end items-center px-6 py-4 bg-primary text-white shadow-md">

      <div className="relative">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Foto de perfil"
            className="w-10 h-10 rounded-full cursor-pointer object-cover border-2 border-white"
            onClick={toggleDropdown}
          />
        ) : (
          <FaUserCircle
            className="w-10 h-10 text-white cursor-pointer"
            onClick={toggleDropdown}
          />
        )}

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-4 border-b border-gray-100">
              <p className="font-semibold text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
