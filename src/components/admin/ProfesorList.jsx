import { FaEdit, FaTrash, FaUserTie } from "react-icons/fa";

const ProfesorList = ({ profesores, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-5xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-primary mb-4 text-center flex items-center justify-center gap-2">
        <FaUserTie /> Lista de Profesores
      </h2>
      <ul className="space-y-4">
        {profesores.map((profesor) => (
          <li key={profesor.id} className="flex flex-col sm:flex-row justify-between items-center border-b pb-2 gap-3">
            <div className="flex items-center gap-4">
              {profesor.foto_url && (
                <img src={profesor.foto_url} alt="Foto" className="w-12 h-12 rounded-full object-cover" />
              )}
              <div>
                <p className="font-semibold">{profesor.nombre}</p>
                <p className="text-sm text-gray-600">CI: {profesor.ci}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(profesor)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg flex items-center gap-1"
              >
                <FaEdit /> Editar
              </button>
              <button
                onClick={() => {
                  if (window.confirm("¿Eliminar profesor?")) onDelete(profesor.id);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-1"
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfesorList;
