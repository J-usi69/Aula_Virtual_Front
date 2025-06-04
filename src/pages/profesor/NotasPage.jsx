<<<<<<< HEAD
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getProfesorGestion, guardarNota, getMateriasProfesor } from "../../services/ProfesorAulaService";

export default function NotasPage() {
  const { user } = useAuth();
  const [gestionData, setGestionData] = useState(null);
  const [materias, setMaterias] = useState([]);
  const [selectedGestionCursoParaleloId, setSelectedGestionCursoParaleloId] = useState(null);
  const [selectedMateriaProfesorId, setSelectedMateriaProfesorId] = useState(null);
  const [estudiantes, setEstudiantes] = useState([]);
  const [notas, setNotas] = useState({}); // { estudiante_id: promedio_final }

  // Carga gestión y materias del profesor
  useEffect(() => {
    if (user?.profesor?.profesor_id) {
      getProfesorGestion(user.profesor.profesor_id)
        .then(setGestionData)
        .catch(console.error);

      getMateriasProfesor(user.profesor.profesor_id)
        .then(setMaterias)
        .catch(console.error);
    }
  }, [user]);

  // Carga estudiantes cuando cambia la gestión seleccionada
  const loadEstudiantes = useCallback(() => {
    if (!gestionData?.gestion || !selectedGestionCursoParaleloId) {
      setEstudiantes([]);
      return;
    }
    const gcp = gestionData.gestion
      .flatMap((g) => g.gestion_curso_paralelo)
      .find((g) => g.gestion_curso_paralelo_id === selectedGestionCursoParaleloId);

    if (!gcp) {
      setEstudiantes([]);
      return;
    }

    setEstudiantes(gcp.estudiantes || []);
  }, [gestionData, selectedGestionCursoParaleloId]);

  useEffect(() => {
    loadEstudiantes();
    setNotas({}); // Reset notas al cambiar gestión
  }, [loadEstudiantes]);

  const handleNotaChange = (estudiante_id, value) => {
    const numero = parseFloat(value);
    if (isNaN(numero) || numero < 0 || numero > 100) return; // validar rango 0-100
    setNotas((prev) => ({ ...prev, [estudiante_id]: numero }));
=======
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
>>>>>>> upstream/main
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
    if (!selectedGestionCursoParaleloId || !selectedMateriaProfesorId) {
      alert("Por favor selecciona gestión y materia.");
      return;
    }

    const notasAEnviar = estudiantes
      .filter((est) => notas[est.estudiante_id] !== undefined)
      .map((est) => ({
        promedio_final: notas[est.estudiante_id],
        estudiante_id: est.estudiante_id,
        gestion_curso_paralelo_id: selectedGestionCursoParaleloId,
        materia_profesor_id: selectedMateriaProfesorId,
      }));

    if (notasAEnviar.length === 0) {
      alert("Por favor ingresa al menos una nota.");
      return;
    }

    try {
      // Asumo que guardarNota acepta una nota por vez
      // Si tu API acepta array, ajusta aquí.
      for (const nota of notasAEnviar) {
        await guardarNota(nota);
      }
      alert("Notas guardadas correctamente");
      setNotas({});
    } catch (error) {
      alert("Error al guardar notas");
=======
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
>>>>>>> upstream/main
      console.error(error);
    }
  };

  return (
<<<<<<< HEAD
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Registrar Notas</h1>

      <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-1">Gestión Curso Paralelo</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={selectedGestionCursoParaleloId || ""}
            onChange={(e) => setSelectedGestionCursoParaleloId(Number(e.target.value))}
          >
            <option value="" disabled>
              Selecciona gestión curso paralelo
            </option>
            {gestionData?.gestion?.map((gestion) =>
              gestion.gestion_curso_paralelo.map((gcp) => (
                <option key={gcp.gestion_curso_paralelo_id} value={gcp.gestion_curso_paralelo_id}>
                  {gestion.gestion_nombre} - {gcp.curso_paralelo || `ID ${gcp.gestion_curso_paralelo_id}`}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Materia</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={selectedMateriaProfesorId || ""}
            onChange={(e) => setSelectedMateriaProfesorId(Number(e.target.value))}
          >
            <option value="" disabled>
              Selecciona materia
            </option>
            {materias.map((m) => (
              <option key={m.materia_profesor_id} value={m.materia_profesor_id}>
                {m.materia_nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {estudiantes.length > 0 && (
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-3">Estudiantes</h2>
          <div className="overflow-auto max-h-96 border border-gray-300 rounded p-3">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-4 py-2">Nombre</th>
                  <th className="text-left px-4 py-2">Nota (0 - 100)</th>
                </tr>
              </thead>
              <tbody>
                {estudiantes.map((est) => (
                  <tr key={est.estudiante_id} className="border-b">
                    <td className="px-4 py-2">{est.estudiante_nombre || `ID ${est.estudiante_id}`}</td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        className="border border-gray-300 rounded px-2 py-1 w-24"
                        value={notas[est.estudiante_id] ?? ""}
                        onChange={(e) => handleNotaChange(est.estudiante_id, e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
          >
            Guardar Notas
          </button>
        </form>
      )}
=======
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
>>>>>>> upstream/main
    </div>
  );
}
