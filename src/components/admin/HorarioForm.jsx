import { useEffect, useState } from "react";
import { FaClock, FaSave, FaCalendarAlt, FaTimes } from "react-icons/fa";
import { getDias } from "../../services/horariosService";

const HorarioForm = ({ onSubmit, initialData, isEditing, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    hora_inicio: "",
    hora_final: "",
    dias: []
  });
  const [diasDisponibles, setDiasDisponibles] = useState([]);
  const [errorDias, setErrorDias] = useState(false); // Estado para error de días

  useEffect(() => {
    const fetchDias = async () => {
      const data = await getDias();
      setDiasDisponibles(data);
    };
    fetchDias();
  }, []);

  useEffect(() => {
    if (initialData && diasDisponibles.length > 0) {
      const diasIDs = diasDisponibles
        .filter((d) => initialData.dias.includes(d.nombre))
        .map((d) => d.id);
      setFormData({
        hora_inicio: initialData.hora_inicio,
        hora_final: initialData.hora_final,
        dias: diasIDs
      });
    } else {
      setFormData({ hora_inicio: "", hora_final: "", dias: [] });
    }
    setErrorDias(false); // limpiar error si cambia initialData
  }, [initialData, diasDisponibles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (id) => {
    setFormData((prev) => {
      const newDias = prev.dias.includes(id)
        ? prev.dias.filter((d) => d !== id)
        : [...prev.dias, id];
      setErrorDias(false); // limpiar error si elige un día
      return { ...prev, dias: newDias };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de días seleccionados
    if (formData.dias.length === 0) {
      setErrorDias(true);
      return;
    }

    onSubmit(formData);
    setFormData({ hora_inicio: "", hora_final: "", dias: [] });
    setErrorDias(false);
    if (onCancelEdit) onCancelEdit();
  };

  const handleCancel = () => {
    setFormData({ hora_inicio: "", hora_final: "", dias: [] });
    setErrorDias(false);
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-dark-700 shadow-md p-4 sm:p-6 rounded-2xl mb-6 w-full"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
        {isEditing ? "Editar Horario" : "Registrar Horario"}
      </h2>

      <div className="grid sm:grid-cols-1 gap-6 mb-4">
        <div>
          <label className="flex items-center gap-2 text-gray-700 mb-1">
            <FaClock /> Hora de inicio:
          </label>
          <input
            type="time"
            name="hora_inicio"
            value={formData.hora_inicio}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <label className="flex items-center gap-2 text-gray-700 mb-1 mt-4">
            <FaClock /> Hora final:
          </label>
          <input
            type="time"
            name="hora_final"
            value={formData.hora_final}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-gray-700 mb-2">
            <FaCalendarAlt /> Días:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {diasDisponibles.map((dia) => (
              <label key={dia.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.dias.includes(dia.id)}
                  onChange={() => handleCheckboxChange(dia.id)}
                />
                {dia.nombre}
              </label>
            ))}
          </div>
          {errorDias && (
            <p className="text-red-600 mt-2 text-sm">
              Selecciona al menos un día.
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center sm:justify-end gap-4">
        <button
          type="submit"
          className="btn-primary px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
        >
          <FaSave /> {isEditing ? "Actualizar" : "Crear"} Horario
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
        >
          <FaTimes /> Cancelar
        </button>
      </div>
    </form>
  );
};

export default HorarioForm;
