import { useEffect, useState } from "react";
import { getBoletas, deleteBoleta } from "../../services/boletaDeInscripcion";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function BoletaList({ reloadTrigger, onEdit }) {
  const [boletas, setBoletas] = useState([]);

  const fetchBoletas = async () => {
    try {
      const res = await getBoletas();
      const todasLasBoletas = res.flatMap((gestion) => gestion.boletas);
      setBoletas(todasLasBoletas);
    } catch (error) {
      console.error("Error al obtener boletas:", error);
    }
  };

  useEffect(() => {
    fetchBoletas();
  }, [reloadTrigger]);

  const handleEliminar = async (id) => {
    if (confirm("¿Seguro que deseas eliminar esta boleta?")) {
      try {
        await deleteBoleta(id);
        fetchBoletas();
      } catch (error) {
        console.error("Error al eliminar boleta:", error);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-dark-700 shadow-md rounded-xl p-3 text-sm">
      <h2 className="text-lg font-bold text-primary mb-3">
        Boletas Registradas
      </h2>
      <div className="max-h-[360px] overflow-y-auto rounded-md border border-gray-200 text-xs">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-primary text-white z-10 text-xs">
            <tr>
              <th className="p-2">Estudiante</th>
              <th className="p-2">CI</th>
              <th className="p-2">Curso</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Hora</th>
              <th className="p-2">Registrado por</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {boletas.map((b) => (
              <tr
                key={b.boleta_id}
                className="border-b hover:bg-gray-50 dark:hover:bg-dark-600"
              >
                <td className="p-2 font-medium text-gray-800 whitespace-nowrap">
                  {b.estudiante?.nombre} {b.estudiante?.apellido}
                </td>
                <td className="p-2 text-gray-600">{b.estudiante?.ci}</td>
                <td className="p-2 text-gray-600 whitespace-nowrap">
                  {b.curso_paralelo?.curso} "{b.curso_paralelo?.paralelo}"
                </td>
                <td className="p-2 text-gray-600">{b.fecha}</td>
                <td className="p-2 text-gray-600">{b.hora}</td>
                <td className="p-2 text-gray-600">{b.registrado_por?.name}</td>
                <td className="p-2 flex justify-center gap-1 flex-wrap">
                  <button
                    onClick={() => onEdit(b)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-0.5 rounded transition flex items-center gap-1 text-xs"
                  >
                    <FaEdit />
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(b.boleta_id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-0.5 rounded transition flex items-center gap-1 text-xs"
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
}
