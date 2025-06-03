import { useEffect, useState } from "react";
import { getMatriculas, deleteMatricula } from "../../services/pagoMatricula";

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
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4 text-primary">Pagos de Matrícula Registrados</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Estudiante</th>
              <th className="px-4 py-2">CI</th>
              <th className="px-4 py-2">Monto Bs.</th>
              <th className="px-4 py-2">Subgestión</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago) => (
              <tr key={pago._key} className="border-t">
                <td className="px-4 py-2">
                  {pago.estudiante?.nombre} {pago.estudiante?.apellido}
                </td>
                <td className="px-4 py-2">{pago.estudiante?.ci}</td>
                <td className="px-4 py-2">{pago.monto} Bs.</td>
                <td className="px-4 py-2">
                  {pago.subgestion?.gestion_nombre} - {pago.subgestion?.nombre}
                </td>
                <td className="px-4 py-2">{pago.fecha}</td>

                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(pago.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {pagos.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
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
