import { useEffect, useState } from "react";
import { FaSave, FaTimes, FaPlus } from "react-icons/fa";
import { getCursosParalelos } from "../../services/gestionServices";

const GestionForm = ({ onSubmit, initialData, isEditing, onCancel }) => {
  const [nombre, setNombre] = useState("");
  const [cursoParaleloId, setCursoParaleloId] = useState("");
  const [cursosDisponibles, setCursosDisponibles] = useState([]);
  const [cursosParalelos, setCursosParalelos] = useState([]);

  useEffect(() => {
    const cargarCursos = async () => {
      try {
        const data = await getCursosParalelos();
        setCursosDisponibles(data);
      } catch (error) {
        console.error("Error al cargar cursos paralelos:", error);
      }
    };

    cargarCursos();
  }, []);

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre);
      const cursosCompletos = initialData.cursos_paralelos?.map((cp) => {
        const encontrado = cursosDisponibles.find((c) => c.id === cp.id);
        return encontrado || cp;
      }) || [];
      setCursosParalelos(cursosCompletos);
    } else {
      setNombre("");
      setCursosParalelos([]);
    }
  }, [initialData, cursosDisponibles]);

  const handleAddCurso = () => {
    if (!cursoParaleloId) return;

    const yaAgregado = cursosParalelos.some((cp) => cp.id === parseInt(cursoParaleloId));
    if (yaAgregado) return;

    const seleccionado = cursosDisponibles.find((cp) => cp.id === parseInt(cursoParaleloId));
    if (seleccionado) {
      setCursosParalelos([...cursosParalelos, seleccionado]);
      setCursoParaleloId("");
    }
  };

  const handleDeleteCurso = (id) => {
    const actualizados = cursosParalelos.filter((cp) => cp.id !== id);
    setCursosParalelos(actualizados);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      nombre,
      cursos_paralelos_ids: cursosParalelos.map((cp) => cp.id),
    };
    onSubmit(data);
    setNombre("");
    setCursosParalelos([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-7xl mx-auto mt-6"
    >
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">
        {isEditing ? "Editar Gestión" : "Registrar Gestión"}
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <div className="flex-1 w-full">
          <label className="text-gray-700 font-medium block mb-1">Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Gestión 2025"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="flex-1 w-full">
          <label className="text-gray-700 font-medium block mb-1">
            Curso-Paralelo:
          </label>
          <div className="flex gap-2">
            <select
              value={cursoParaleloId}
              onChange={(e) => setCursoParaleloId(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg"
            >
              <option value="">Seleccionar...</option>
              {cursosDisponibles.map((cp) => (
                <option key={cp.id} value={cp.id}>
                  {cp.curso} - {cp.paralelo}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleAddCurso}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2 md:mt-6">
          <button
            type="submit"
            className="btn-primary font-semibold px-6 py-2 rounded-lg transition flex items-center gap-2"
          >
            <FaSave />
            {isEditing ? "Actualizar" : "Crear"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition flex items-center gap-2"
          >
            <FaTimes />
            Cancelar
          </button>
        </div>
      </div>

      {cursosParalelos.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Cursos-Paralelos Seleccionados:
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {cursosParalelos.map((cp, index) => (
              <div
                key={`${cp.id}-${cp.curso}-${cp.paralelo}-${index}`}
                className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg flex justify-between items-center"
              >
                <span className="text-sm">
                  {cp.curso} - {cp.paralelo}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteCurso(cp.id)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
};

export default GestionForm;
