import { useState } from "react";
import { FaEdit, FaTrash, FaLayerGroup, FaChevronDown, FaChevronUp } from "react-icons/fa";

const GestionList = ({ gestiones, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta gestión?")) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-700 shadow-md rounded-2xl p-4 h-full flex flex-col">
      <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex items-center gap-2">
        <FaLayerGroup />
        Lista de Gestiones
      </h2>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 flex-grow">
        <div className="max-h-[540px] sm:max-h-[450px] overflow-y-auto">
          <table className="min-w-[700px] w-full table-fixed border-collapse">
            <thead className="sticky top-0 bg-primary text-white z-10">
              <tr>
                <th className="px-4 py-2 text-left w-1/4 min-w-[100px]">#</th>
                <th className="px-4 py-2 text-left w-1/4 min-w-[200px]">Nombre</th>
                <th className="px-4 py-2 text-left w-1/4 min-w-[200px]">Cursos-Paralelos</th>
                <th className="px-4 py-2 text-center w-1/4 min-w-[200px]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {gestiones.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No hay gestiones registradas.
                  </td>
                </tr>
              ) : (
                gestiones.map((gestion, index) => (
                  <tr
                    key={gestion.id}
                    className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dark-600 align-top"
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{gestion.nombre}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => toggleExpand(gestion.id)}
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        {expanded === gestion.id ? "Ocultar" : "Ver"} ({gestion.cursos_paralelos?.length || 0})
                        {expanded === gestion.id ? <FaChevronUp /> : <FaChevronDown />}
                      </button>

                      {expanded === gestion.id && (
                        <ul className="mt-2 space-y-1 text-sm">
                          {gestion.cursos_paralelos?.map((cp, idx) => (
                            <li
                              key={idx}
                              className="border rounded px-2 py-1 bg-gray-50 dark:bg-dark-500"
                            >
                              {cp.curso} - {cp.paralelo}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => onEdit(gestion)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg transition flex items-center gap-1"
                        >
                          <FaEdit />
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(gestion.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition flex items-center gap-1"
                        >
                          <FaTrash />
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestionList;
