import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getProfesorGestion, guardarParticipacion } from "../../services/ProfesorAulaService";

export default function ParticipacionPage() {
  const { gcpId, materiaId } = useParams();
  const { user } = useAuth();
  const [hora, setHora] = useState("");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
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
              estado: "No participó",
            }))
          );
        })
        .catch(console.error);
    }
  }, [user, gcpId]);

  const toggleEstado = (id) => {
    setEstudiantes((prev) =>
      prev.map((e) =>
        e.estudiante_id === id
          ? { ...e, estado: e.estado === "Participó" ? "No participó" : "Participó" }
          : e
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hora || !fecha || !descripcion) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const payload = {
      descripcion,
      hora,
      fecha,
      gestion_curso_paralelo_id: Number(gcpId),
      profesor_id: user.profesor.id,
      materia_profesor_id: Number(materiaId),
      estudiantes: estudiantes.map(({ estudiante_id, estado }) => ({ estudiante_id, estado })),
    };

    console.log("Payload a enviar:", JSON.stringify(payload, null, 2));

    try {
      await guardarParticipacion(payload);
      alert("Participación registrada correctamente");
      setHora("");
      setFecha("");
      setDescripcion("");
    } catch (error) {
      alert("Error al guardar participación");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Registrar Participación</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Descripción</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
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

        {estudiantes.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Estudiantes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-auto border border-gray-300 rounded p-3">
              {estudiantes.map((est) => (
                <div
                  key={est.estudiante_id}
                  onClick={() => toggleEstado(est.estudiante_id)}
                  className="flex justify-between items-center p-3 border rounded cursor-pointer hover:bg-gray-100"
                >
                  <p className="font-medium">{est.estudiante_nombre}</p>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      est.estado === "Participó" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                    }`}
                  >
                    {est.estado}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
        >
          Guardar Participación
        </button>
      </form>
    </div>
  );
}
