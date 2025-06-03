import { FaIdCard, FaSearch, FaCalendarAlt, FaClock, FaChalkboardTeacher } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  getBoletaGestioCursoParalelo,
  getEstudianteByCI,
  createBoleta,
  updateBoleta,
} from "../../services/boletaDeInscripcion";
import { useAuth } from "../../hooks/useAuth";

export default function BoletaForm({ onBoletaRegistrada, boletaToEdit, cancelEdit }) {
  const { user } = useAuth();
  const [ci, setCi] = useState("");
  const [estudiante, setEstudiante] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [seleccionado, setSeleccionado] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    getBoletaGestioCursoParalelo().then(setOpciones);
  }, []);

  useEffect(() => {
    if (boletaToEdit) {
      const est = boletaToEdit.estudiante;
      setCi(est.ci);
      setEstudiante(est);
      setSeleccionado(boletaToEdit.gestion_curso_paralelo_id);
      setFecha(boletaToEdit.fecha);
      setHora(boletaToEdit.hora);
    }
  }, [boletaToEdit]);

  const buscarEstudiante = async () => {
    try {
      const res = await getEstudianteByCI(ci);
      if (res.length > 0) {
        setEstudiante(res[0]);
      } else {
        setEstudiante(null);
        alert("Estudiante no encontrado");
      }
    } catch (error) {
      console.error("Error al buscar estudiante:", error);
      alert("Error al buscar estudiante");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!estudiante || !seleccionado || !fecha || !hora)
      return alert("Completa todos los campos");

    const payload = {
      ci: estudiante.ci,
      gestion_curso_paralelo_id: parseInt(seleccionado),
      users_id: user?.id,
      fecha,
      hora,
    };

    try {
      if (boletaToEdit) {
        await updateBoleta(boletaToEdit.boleta_id, payload);
      } else {
        await createBoleta(payload);
      }
      onBoletaRegistrada();
      limpiarFormulario();
    } catch (error) {
      console.error(error);
      alert("Error al registrar/editar boleta");
    }
  };

  const limpiarFormulario = () => {
    setCi("");
    setEstudiante(null);
    setSeleccionado("");
    setFecha("");
    setHora("");
    cancelEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6"
    >
      <h2 className="text-xl font-semibold mb-6  text-primary flex items-center gap-2">
        <FaIdCard />
        {boletaToEdit ? "Editar Boleta" : "Registrar Boleta de Inscripción"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CI del estudiante */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CI del estudiante
          </label>
          <div className="flex gap-2 items-center">
            <div className="relative w-full">
              <input
                type="text"
                value={ci}
                onChange={(e) => setCi(e.target.value)}
                disabled={!!boletaToEdit}
                className="border rounded px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Ingrese CI"
              />
              <FaIdCard className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button
              type="button"
              onClick={buscarEstudiante}
              disabled={!!boletaToEdit}
              className="btn-primary flex items-center justify-center gap-2 px-4 py-2 rounded-lg w-full sm:w-auto"
            >
              <FaSearch />
              Buscar
            </button>
          </div>
          {estudiante && (
            <p className="mt-2 text-sm text-green-600">
              Estudiante: {estudiante.nombre} {estudiante.apellido}
            </p>
          )}
        </div>

        {/* Gestión - Curso - Paralelo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gestión - Curso - Paralelo
          </label>
          <div className="relative">
            <select
              value={seleccionado}
              onChange={(e) => setSeleccionado(e.target.value)}
              className="border rounded px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Seleccionar...</option>
              {opciones.map((item) => (
                <option key={item.gestion_curso_paralelo_id} value={item.gestion_curso_paralelo_id}>
                  {item.gestion.gestion_nombre} - {item.curso_paralelo.curso.curso_nombre} "{item.curso_paralelo.paralelo.paralelo_nombre}"
                </option>
              ))}
            </select>
            <FaChalkboardTeacher className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <div className="relative">
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="border rounded px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <FaCalendarAlt className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Hora */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hora
          </label>
          <div className="relative">
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="border rounded px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <FaClock className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          {boletaToEdit ? "Actualizar" : "Registrar"}
        </button>
        {boletaToEdit && (
          <button
            type="button"
            onClick={limpiarFormulario}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
