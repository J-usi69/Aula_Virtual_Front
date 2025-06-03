import { useEffect, useState } from "react";
import { getMaterias } from "../../services/materiasService";
import { getHorarios } from "../../services/horariosService";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const AsignacionMateriasForm = ({ selectedMaterias = [], onChange }) => {
  const [materiasOptions, setMateriasOptions] = useState([]);
  const [horariosOptions, setHorariosOptions] = useState([]);
  const [materiasAsignadas, setMateriasAsignadas] = useState([]);
  const [materiaForm, setMateriaForm] = useState({ materia_id: "", horario_id: "", dias: [] });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [materias, horarios] = await Promise.all([
        getMaterias(),
        getHorarios(),
      ]);
      setMateriasOptions(materias || []);
      setHorariosOptions(horarios || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setMateriasAsignadas(selectedMaterias);
  }, [selectedMaterias]);

  const handleMateriaFieldChange = (field, value) => {
    setMateriaForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "horario_id") {
      const horarioSeleccionado = horariosOptions.find((h) => h.id === parseInt(value));
      if (horarioSeleccionado) {
        setMateriaForm((prev) => ({
          ...prev,
          horario_id: parseInt(value),
          dias: [...horarioSeleccionado.dias], // Seleccionar todos los días automáticamente
        }));
      }
    }
  };



  const addOrUpdateMateria = () => {
    const nuevaMateria = {
      materia_id: materiaForm.materia_id,
      horario_id: materiaForm.horario_id,
      dias: materiaForm.dias,
    };

    const updatedMaterias = [...materiasAsignadas];
    if (editingIndex !== null) {
      updatedMaterias[editingIndex] = nuevaMateria;
    } else {
      updatedMaterias.push(nuevaMateria);
    }

    setMateriasAsignadas(updatedMaterias);
    onChange(updatedMaterias);
    setMateriaForm({ materia_id: "", horario_id: "", dias: [] });
    setEditingIndex(null);
    setShowForm(false);
  };

  const handleEditMateria = (index) => {
    setMateriaForm(materiasAsignadas[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleRemoveMateria = (index) => {
    const updated = [...materiasAsignadas];
    updated.splice(index, 1);
    setMateriasAsignadas(updated);
    onChange(updated);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-primary">
        Asignar Materias y Horarios
      </h3>

      {materiasAsignadas.map((m, index) => {
        const materia = materiasOptions.find((mat) => mat.id === m.materia_id);
        const horario = horariosOptions.find((h) => h.id === m.horario_id);
        return (
          <div
            key={index}
            className="border p-3 rounded-lg mb-2 flex flex-col md:flex-row md:items-center justify-between gap-2"
          >
            <div>
              <p className="font-medium">
                {materia?.sigla} - {materia?.nombre}
              </p>
              <p className="text-sm text-gray-600">
                Horario: {m.dias.join(", ")} ({horario?.hora_inicio} - {horario?.hora_final})
              </p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="text-blue-600" onClick={() => handleEditMateria(index)}>
                <FaEdit />
              </button>
              <button type="button" className="text-red-600" onClick={() => handleRemoveMateria(index)}>
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}

      {!showForm && (
        <button
          type="button"
          className="flex items-center gap-2 text-primary my-4"
          onClick={() => {
            setMateriaForm({ materia_id: "", horario_id: "", dias: [] });
            setEditingIndex(null);
            setShowForm(true);
          }}
        >
          <FaPlus /> Agregar nueva materia
        </button>
      )}

      {showForm && (
        <div className="border p-4 mb-4 rounded-xl bg-gray-50">
          <div className="flex flex-col gap-2 mb-2">
            <select
              className="w-full border rounded-lg p-2"
              value={materiaForm.materia_id}
              onChange={(e) => handleMateriaFieldChange("materia_id", parseInt(e.target.value))}
            >
              <option value="">Selecciona una materia</option>
              {materiasOptions.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.sigla} - {m.nombre}
                </option>
              ))}
            </select>

            <select
              className="w-full border rounded-lg p-2"
              value={materiaForm.horario_id}
              onChange={(e) => handleMateriaFieldChange("horario_id", parseInt(e.target.value))}
            >
              <option value="">Selecciona un horario</option>
              {horariosOptions.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.dias.join(", ")} ({h.hora_inicio} - {h.hora_final})
                </option>
              ))}
            </select>
          </div>

          {materiaForm.horario_id && (
            <div className="max-h-32 overflow-y-auto border rounded-lg p-2 grid grid-cols-1 gap-1">
              {horariosOptions
                .find((h) => h.id === materiaForm.horario_id)
                ?.dias.map((dia) => (
                  <label key={dia} className="flex items-center gap-2">
                    <span>{dia}</span>
                  </label>
                ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-3 justify-end">
            <button
              type="button"
              className="text-red-600"
              onClick={() => {
                setShowForm(false);
                setEditingIndex(null);
              }}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="text-green-600 font-medium"
              onClick={addOrUpdateMateria}
            >
              {editingIndex !== null ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AsignacionMateriasForm;
