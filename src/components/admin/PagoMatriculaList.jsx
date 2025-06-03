import { useEffect, useState } from "react";
import { getMatriculas, deleteMatricula } from "../../services/pagoMatricula";
import { FaTrash } from "react-icons/fa";

export default function PagoMatriculaList({ refreshTrigger }) {
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    getMatriculas().then((data) => {
      const todasLasMatriculas = data.flatMap((subgestion) =>
        subgestion.matriculas.map((matricula) => ({
          ...matricula,
          subgestion: {
            nombre: subgestion.nombre,
            gestion_nombre: `${new Date(subgestion.fecha_inicio).getFullYear()}`,
          },
          _key: matricula.id,
        }))
      );
      setPagos(todasLasMatriculas);
    });
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este pago?")) return;
    try {
      await deleteMatricula(id);
      setPagos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el pago");
    }
  };

  return (
    <div className="bg-white dark:bg-dark-700 shadow-md rounded-xl p-3 text-sm">
      <h2 className="text-lg font-bold text-primary mb-3">Pagos de Matrícula Registrados</h2>
      <div className="max-h-[360px] overflow-y-auto rounded-md border border-gray-200 text-xs">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-primary text-white z-10 text-xs">
            <tr>
              <th className="p-2">Estudiante</th>
              <th className="p-2">CI</th>
              <th className="p-2">Monto Bs.</th>
              <th className="p-2">Subgestión</th>
              <th className="p-2">Fecha</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago._key} className="border-b hover:bg-gray-50 dark:hover:bg-dark-600">
                <td className="p-2 font-medium text-gray-800 whitespace-nowrap">
                  {pago.estudiante?.nombre} {pago.estudiante?.apellido}
                </td>
                <td className="p-2 text-gray-600">{pago.estudiante?.ci}</td>
                <td className="p-2 text-gray-600">{pago.monto} Bs.</td>
                <td className="p-2 text-gray-600 whitespace-nowrap">
                  {pago.subgestion?.gestion_nombre} - {pago.subgestion?.nombre}
                </td>
                <td className="p-2 text-gray-600">{pago.fecha}</td>
                <td className="p-2 flex justify-center gap-1 flex-wrap">
                  <button
                    onClick={() => handleDelete(pago.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-0.5 rounded transition flex items-center gap-1 text-xs"
                  >
                    <FaTrash />
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {pagos.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No hay pagos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
