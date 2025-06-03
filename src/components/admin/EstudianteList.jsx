import { FaEdit, FaTrash } from "react-icons/fa";

const EstudianteList = ({ estudiantes, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-dark-700 shadow-md rounded-2xl p-4 h-full flex flex-col">
      <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
        Lista de Estudiantes
      </h2>

      {/* Scroll horizontal y vertical dentro del área de la tabla */}
      <div className="flex-grow rounded-2xl border border-gray-200 overflow-hidden">
        <div className="w-full h-full overflow-auto max-h-[500px]">
          <table className="min-w-[900px] w-full text-sm sm:text-base border-collapse">
            <thead className="sticky top-0 bg-primary text-white z-10">
              <tr>
                <th className="px-4 py-2 text-left">Foto</th>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Apellido</th>
                <th className="px-4 py-2 text-left">CI</th>
                <th className="px-4 py-2 text-left">Sexo</th>
                <th className="px-4 py-2 text-left">Teléfono</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((estudiante) => (
                <tr
                  key={estudiante.estudiante_id}
                  className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dark-600"
                >
                  <td className="px-4 py-2 text-center">
                    {estudiante.user?.photo_url ? (
                      <img
                        src={estudiante.user.photo_url}
                        alt="Foto"
                        className="w-10 h-10 rounded-full object-cover mx-auto"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">Sin foto</span>
                    )}
                  </td>
                  <td className="px-4 py-2 break-words">{estudiante.nombre}</td>
                  <td className="px-4 py-2 break-words">{estudiante.apellido}</td>
                  <td className="px-4 py-2">{estudiante.ci}</td>
                  <td className="px-4 py-2">{estudiante.sexo}</td>
                  <td className="px-4 py-2">{estudiante.telefono}</td>
                  <td className="px-4 py-2 truncate max-w-[180px]">{estudiante.user?.email}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-2 flex-wrap">
                      <button
                        onClick={() => onEdit(estudiante)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded-lg transition flex items-center gap-1"
                      >
                        <FaEdit className="text-sm" />
                        <span className="hidden sm:inline">Editar</span>
                      </button>
                      <button
                        onClick={() => onDelete(estudiante.estudiante_id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg transition flex items-center gap-1"
                      >
                        <FaTrash className="text-sm" />
                        <span className="hidden sm:inline">Eliminar</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EstudianteList;
