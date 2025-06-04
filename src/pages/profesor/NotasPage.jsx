import { useParams } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getProfesorGestion, guardarNota } from "../../services/ProfesorAulaService";

export default function NotasFinalesPage() {
  const { gcpId, materiaId } = useParams();
  const { user } = useAuth();
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    if (user?.profesor?.id) {
      getProfesorGestion(user.profesor.id)
        .then((data) => {
          const gcp = data.gestion
            .flatMap((g) => g.gestion_curso_paralelo)
            .find((g) => g.gestion_curso_paralelo_id === Number(gcpId));

          if (!gcp) return;

          const estudiantesList = gcp.materia
            ?.flatMap((m) => m.cursos_paralelo)
            ?.flatMap((cp) => cp.estudiante) || [];

          setEstudiantes(
            estudiantesList.map((e) => ({
              estudiante_id: e.estudiante_id,
              estudiante_nombre: `${e.estudiante_nombre} ${e.estudiante_apellido}`,
              promedio_final: "",
            }))
          );
        })
        .catch(console.error);
    }
  }, [user, gcpId]);

  const handleChange = (id, value) => {
    setEstudiantes((prev) =>
      prev.map((e) =>
        e.estudiante_id === id ? { ...e, promedio_final: value } : e
      )
    );  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosInvalidos = estudiantes.some(
      (e) => e.promedio_final === "" || isNaN(Number(e.promedio_final))
    );
    if (datosInvalidos) {
      alert("Por favor, ingresa todas las notas numéricas.");
      return;
    }

    const payload = estudiantes.map(({ estudiante_id, promedio_final }) => ({
      estudiante_id,
      promedio_final: parseFloat(promedio_final),
      gestion_curso_paralelo_id: Number(gcpId),
      materia_profesor_id: Number(materiaId),
    }));

    console.log("Payload:", JSON.stringify(payload, null, 2));

    try {
      for (const nota of payload) {
        await guardarNota(nota); 
      }
      alert("Notas finales registradas correctamente");
    } catch (error) {
      alert("Error al guardar las notas");  
      console.error(error);
    }
  };

  return (  
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Registrar Notas Finales</h1>

      <form onSubmit={handleSubmit}>
        {estudiantes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 max-h-96 overflow-auto border border-gray-300 rounded p-4">
            {estudiantes.map((est) => (
              <div key={est.estudiante_id} className="flex flex-col">
                <label className="font-medium mb-1">{est.estudiante_nombre}</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={est.promedio_final}
                  onChange={(e) => handleChange(est.estudiante_id, e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2"
                  placeholder="Promedio Final"
                  required
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No se encontraron estudiantes.</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
        >
          Guardar Notas
        </button>
      </form>
    </div>  
  );
} 