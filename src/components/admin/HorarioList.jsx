import { FaEdit, FaTrash } from "react-icons/fa";

const HorarioList = ({ horarios, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-dark-700 shadow-md rounded-2xl p-2 h-full flex flex-col">
      <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 flex-shrink-0">
        Lista de Horarios
      </h2>

      <div className="overflow-x-auto rounded-2xl border border-gray-200  flex-grow">

        <div className="max-h-[540px] sm:max-h-[450px] overflow-y-auto">
          <table className="min-w-[600px] w-full table-fixed border-collapse">
            <thead className="sticky top-0 bg-primary text-white z-10">
              <tr>
                <th className="px-4 py-2 text-left w-1/3 min-w-[150px]">Horario</th>
                <th className="px-4 py-2 text-left w-1/3 min-w-[150px]">Días</th>
                <th className="px-4 py-2 text-center w-1/3 min-w-[150px]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map((horario) => (
                <tr
                  key={horario.id}
                  className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-dark-600"
                >
                  <td className="px-4 py-2">{horario.hora_inicio} - {horario.hora_final}</td>
                  <td className="px-4 py-2">{horario.dias.join(", ")}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(horario)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg transition flex items-center gap-1"
                      >
                        <FaEdit /> Editar
                      </button>
                      <button
                        onClick={() => onDelete(horario.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition flex items-center gap-1"
                      >
                        <FaTrash /> Eliminar
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

export default HorarioList;
