import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  getProfesorGestion,
  guardarAsistencia,
} from "../../services/ProfesorAulaService";
import { useParams, useNavigate } from "react-router-dom";

export default function AsistenciaPage() {
  const { gestion_curso_paralelo_id, materia_id, paralelo_id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [gestionData, setGestionData] = useState(null);
  const [hora, setHora] = useState("");
  const [fecha, setFecha] = useState("");
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    if (user?.profesor?.id) {
      getProfesorGestion(user.profesor.id)
        .then((data) => {
          console.log("GESTION DATA:", data);
          setGestionData(data);
        })
        .catch(console.error);
    }
  }, [user]);

  const loadEstudiantes = useCallback(() => {
    if (!gestionData?.gestion) return;

    const todosGCP = gestionData.gestion.flatMap((g) => g.gestion_curso_paralelo);
    console.log("Todos los GCP:", todosGCP);

    const gcp = todosGCP.find(
      (g) => g.gestion_curso_paralelo_id === Number(gestion_curso_paralelo_id)
    );

    if (!gcp) {
      console.warn("⚠️ GCP no encontrado");
      return;
    }

    console.log("GCP Seleccionado:", gcp);

    if (!gcp.materia || !Array.isArray(gcp.materia)) {
      console.warn("⚠️ No hay materias en el GCP o no es un arreglo");
      return;
    }

    const materiaObj = gcp.materia.find(
      (m) => m.materia_id === Number(materia_id)
    );

    if (!materiaObj) {
      console.warn("⚠️ Materia no encontrada en el GCP");
      return;
    }

    console.log("Materia seleccionada:", materiaObj);

    const cursoParalelo = materiaObj.cursos_paralelo?.find(
      (cp) => cp.curso_paralelo_id === Number(paralelo_id)
    );

    if (!cursoParalelo) {
      console.warn("⚠️ Curso paralelo no encontrado dentro de la materia");
      return;
    }

    console.log("Curso paralelo encontrado:", cursoParalelo);

    const estudiantesList = cursoParalelo.estudiante || [];

    const uniqueEstudiantes = Object.values(
      estudiantesList.reduce((acc, e) => {
        acc[e.estudiante_id] = e;
        return acc;
      }, {})
    );

    setEstudiantes(
      uniqueEstudiantes.map((e) => ({
        estudiante_id: e.estudiante_id,
        estudiante_nombre: `${e.estudiante_nombre} ${e.estudiante_apellido || ""}`.trim(),
        estado: "Ausente",
      }))
    );
  }, [gestionData, gestion_curso_paralelo_id, materia_id, paralelo_id]);

  useEffect(() => {
    if (gestion_curso_paralelo_id && materia_id && paralelo_id) {
      loadEstudiantes();
    }
  }, [gestion_curso_paralelo_id, materia_id, paralelo_id, loadEstudiantes]);

  const toggleEstado = (id) => {
    setEstudiantes((prev) =>
      prev.map((e) =>
        e.estudiante_id === id
          ? { ...e, estado: e.estado === "Presente" ? "Ausente" : "Presente" }
          : e
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hora || !fecha) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const payload = {
      hora,
      fecha,
      gestion_curso_paralelo_id: Number(gestion_curso_paralelo_id),
      profesor_id: user.profesor.id,
      estudiantes: estudiantes.map(({ estudiante_id, estado }) => ({
        estudiante_id,
        estado,
      })),
    };

    try {
      await guardarAsistencia(payload);
      alert("Asistencia guardada correctamente");
      setHora("");
      setFecha("");
      setEstudiantes([]);
      navigate("/profesor");
    } catch (error) {
      alert("Error al guardar asistencia");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Registrar Asistencia</h1>

      <div className="mb-6">
        <p>
          <strong>Gestión Curso Paralelo ID:</strong> {gestion_curso_paralelo_id}
        </p>
        <p>
          <strong>Materia ID:</strong> {materia_id}
        </p>
        <p>
          <strong>Paralelo ID:</strong> {paralelo_id}
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Fecha</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-1">Hora</label>
          <input
            type="time"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </div>
      </div>

      {estudiantes.length > 0 ? (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Estudiantes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-auto border border-gray-300 rounded p-3">
            {estudiantes.map((est) => (
              <div
                key={est.estudiante_id}
                onClick={() => toggleEstado(est.estudiante_id)}
                className="flex justify-between items-center p-3 border rounded cursor-pointer hover:bg-gray-100"
              >
                <p className="font-medium">
                  {est.estudiante_nombre || `ID ${est.estudiante_id}`}
                </p>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    est.estado === "Presente"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {est.estado}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="mb-6 text-center text-gray-500">
          No hay estudiantes para mostrar.
        </p>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition"
      >
        Guardar Asistencia
      </button>
    </div>
  );
}
