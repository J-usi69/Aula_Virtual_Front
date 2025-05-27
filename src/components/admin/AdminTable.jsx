import { FaEdit, FaTrash } from "react-icons/fa";

const AdminTable = ({ admins, onEdit, onDelete }) => {
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este administrador?")) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-700 shadow-md rounded-2xl p-4">
      <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
        Lista de Administradores
      </h2>
      <div className="max-h-[400px] overflow-y-auto rounded-lg border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-primary text-white z-10">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Correo</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b hover:bg-gray-50 dark:hover:bg-dark-600">
                <td className="p-3 font-medium text-gray-800 ">{admin.name}</td>
                <td className="p-3 text-gray-600 ">{admin.email}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(admin)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg transition flex items-center gap-1"
                  >
                    <FaEdit />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(admin.id)}
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

export default AdminTable;
