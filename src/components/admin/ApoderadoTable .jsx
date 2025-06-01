import { FaEdit, FaTrash } from "react-icons/fa";

const ApoderadoTable = ({ apoderados, onEdit, onDelete }) => {
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este apoderado?")) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-700 shadow-md rounded-2xl p-4">
      <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
        Lista de Apoderados
      </h2>
      <div className="max-h-[400px] overflow-y-auto rounded-lg border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-primary text-white z-10">
            <tr>
              <th className="p-3">Foto</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Apellido</th>
              <th className="p-3">CI</th>
              <th className="p-3">Teléfono</th>
              <th className="p-3">Correo</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {apoderados.map((apo) => (
              <tr key={apo.apoderado_id} className="border-b hover:bg-gray-50 dark:hover:bg-dark-600">
                <td className="p-3">
                  {apo.user?.photo_url ? (
                    <img
                      src={apo.user.photo_url}
                      alt="Foto"
                      className="w-10 h-10 rounded-full object-cover mx-auto"
                    />
                  ) : (
                    <span className="text-gray-500">Sin foto</span>
                  )} </td>
                <td className="p-3 font-medium text-gray-800">{apo.nombre}</td>
                <td className="p-3 text-gray-700">{apo.apellido}</td>
                <td className="p-3 text-gray-700">{apo.ci}</td>
                <td className="p-3 text-gray-700">{apo.telefono}</td>
                <td className="p-3 text-gray-700">{apo.user?.email || 'Sin correo'}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(apo)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg transition flex items-center gap-1"
                  >
                    <FaEdit />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(apo.apoderado_id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition flex items-center gap-1"
                  >
                    <FaTrash />
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApoderadoTable;
