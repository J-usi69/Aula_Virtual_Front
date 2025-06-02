import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars, FaTimes, FaUserShield, FaChalkboardTeacher, FaUserGraduate,
  FaFileAlt, FaClock, FaBook, FaUserTie, FaCalendarAlt, FaMoneyBillWave
} from "react-icons/fa";
import logo from "../assets/brain-logo.png";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const toggleSidebar = () => setOpen(!open);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-70 text-white text-2xl"
        onClick={toggleSidebar}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-sidebar-gradient text-sidebar shadow-lg z-40
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col items-center p-6">
          <img src={logo} alt="Logo" className="h-16 mb-4" />
          <h2 className="text-xl font-bold text-center mb-6">AULA INTELIGENTE</h2>

          <nav className="w-full flex flex-col gap-2">
            {[
              { to: "/admin", icon: <FaUserShield />, label: "Administradores" },
              { to: "/admin/profesor", icon: <FaChalkboardTeacher />, label: "Profesores" },
              { to: "/admin/apoderado", icon: <FaUserTie />, label: "Apoderados" },
              { to: "/admin/estudiantes", icon: <FaUserGraduate />, label: "Estudiantes" },
              { to: "/admin/inscripcion", icon: <FaFileAlt />, label: "Inscripción" },
              { to: "/admin/materia", icon: <FaBook />, label: "Materias" },
              { to: "/admin/horario", icon: <FaClock />, label: "Horario" },
              { to: "/admin/gestion", icon: <FaCalendarAlt />, label: "Gestiones" },
              { to: "/admin/matricula", icon: <FaMoneyBillWave />, label: "Pago de Matricula" }
            ].map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition nav-item-hover ${
                    isActive ? "nav-item-active" : ""
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
