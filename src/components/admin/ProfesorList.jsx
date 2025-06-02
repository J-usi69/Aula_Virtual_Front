import { useEffect, useState, Fragment } from "react";
import {
  FaEdit,
  FaTrash,
  FaUserTie,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { getMaterias } from "../../services/materiasService";
import { getHorarios } from "../../services/horariosService";

const ProfesorList = ({ profesores, onEdit, onDelete }) => {
  const [openProfesorId, setOpenProfesorId] = useState(null);
  const [materiaMap, setMateriaMap] = useState({});
  const [horarioMap, setHorarioMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const materias = await getMaterias();
        const horarios = await getHorarios();

        const materiaObj = {};
        materias.forEach((m) => {
          materiaObj[m.id] = m.nombre;
        });

        const horarioObj = {};
        horarios.forEach((h) => {
          horarioObj[h.id] = `${h.hora_inicio} - ${h.hora_final}`;
        });

        setMateriaMap(materiaObj);
        setHorarioMap(horarioObj);
      } catch (err) {
        console.error("Error al obtener materias u horarios:", err);
      }
    };

    fetchData();
  }, []);

  const toggleOpen = (id) => {
    setOpenProfesorId(openProfesorId === id ? null : id);
  };

  return (
    <div className="bg-white dark:bg-dark-700 shadow-md rounded-2xl p-3 h-full flex flex-col">
      <h2 className="text-base sm:text-lg font-bold text-primary mb-3 flex items-center justify-center gap-2">
        <FaUserTie className="text-primary" /> Lista de Profesores
      </h2>

      <div className="overflow-x-auto rounded-2xl border border-gray-200 flex-grow">
        <div className="max-h-[500px] overflow-y-auto text-xs">
          <table className="min-w-[900px] border-gray-200 w-full border-collapse table-auto text-[11px] sm:text-xs">
            <thead className="sticky top-0 bg-primary text-white z-10 text-[10px] sm:text-xs">
              <tr>
                <th className="border px-2 py-2 w-8 text-center">#</th>
                <th className="border px-2 py-2 w-16 text-center">Foto</th>
                <th className="border px-2 py-2 w-36 text-left">Nombre</th>
                <th className="border px-2 py-2 w-20 text-left">CI</th>
                <th className="border px-2 py-2 w-24 text-left">Teléfono</th>
                <th className="border px-2 py-2 w-40 text-left">Email</th>
                <th className="border px-2 py-2 w-40 text-left">Dirección</th>
                <th className="border px-2 py-2 w-28 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {profesores.map((entry) => {
                const { profesor, user, materias } = entry;
                return (
                  <Fragment key={profesor.id}>
                    <tr className="border-gray-200 hover:bg-gray-100 dark:hover:bg-dark-600">
                      <td className="border px-2 py-1 text-center">
                        <button
                          onClick={() => toggleOpen(profesor.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white text-xs p-1 rounded"
                        >
                          {openProfesorId === profesor.id ? (
                            <FaChevronUp size={12} />
                          ) : (
                            <FaChevronDown size={12} />
                          )}
                        </button>
                      </td>
                      <td className="border px-2 py-1 text-center">
                        {user?.photo_url ? (
                          <img
                            src={user.photo_url}
                            alt="Foto"
                            className="w-8 h-8 rounded-full object-cover mx-auto"
                          />
                        ) : (
                          "Sin foto"
                        )}
                      </td>
                      <td className="border px-2 py-1 font-semibold">
                        {profesor.nombre_profesor} {profesor.apellido_profesor}
                      </td>
                      <td className="border px-2 py-1">{profesor.ci}</td>
                      <td className="border px-2 py-1">{profesor.telefono}</td>
                      <td className="border px-2 py-1 break-words">
                        {user?.email}
                      </td>
                      <td className="border px-2 py-1">{profesor.direccion}</td>
                      <td className="border px-2 py-1 text-center">
                        <div className="flex flex-col sm:flex-row justify-center gap-1">
                          <button
                            onClick={() => onEdit(entry)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white text-[10px] px-2 py-1 rounded flex items-center gap-1"
                          >
                            <FaEdit size={12} /> Editar
                          </button>
                          <button
                            onClick={() =>
                              window.confirm("¿Eliminar profesor?") &&
                              onDelete(profesor.id)
                            }
                            className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-2 py-1 rounded flex items-center gap-1"
                          >
                            <FaTrash size={12} /> Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>

                    {openProfesorId === profesor.id && (
                      <tr>
                        <td colSpan="8" className="p-0 bg-gray-50">
                          <div className="overflow-auto max-h-40">
                            <table className="min-w-full text-[10px] sm:text-xs">
                              <thead className="bg-primary text-white sticky top-0 z-10">
                                <tr>
                                  <th className="border px-2 py-1 text-left">
                                    Materia
                                  </th>
                                  <th className="border px-2 py-1 text-left">
                                    Días
                                  </th>
                                  <th className="border px-2 py-1 text-left">
                                    Horario
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {materias.map((m, i) => (
                                  <tr key={i}>
                                    <td className="border px-2 py-1">
                                      {materiaMap[m.materia_id] || "Desconocida"}
                                    </td>
                                    <td className="border px-2 py-1">
                                      {m.dias.join(", ")}
                                    </td>
                                    <td className="border px-2 py-1">
                                      {horarioMap[m.horario_id] || "—"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfesorList;
