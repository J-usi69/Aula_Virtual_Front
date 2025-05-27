import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaSave,
  FaPhotoVideo,
  FaPlus,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { getMaterias } from "../../services/materiasService";
import { getHorarios } from "../../services/horariosService";

const ProfesorForm = ({ onSubmit, initialData, isEditing }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    foto: null,
    materias: [],
  });

  const [materiasOptions, setMateriasOptions] = useState([]);
  const [horariosOptions, setHorariosOptions] = useState([]);

  const [materiaForm, setMateriaForm] = useState({ materia_id: "", dias_horarios: [] });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showMateriaForm, setShowMateriaForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [materias, horarios] = await Promise.all([
        getMaterias(),
        getHorarios(),
      ]);
      setMateriasOptions(materias);
      setHorariosOptions(horarios);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        foto: null,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const val = type === "file" ? files[0] : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleMateriaFieldChange = (field, value) => {
    setMateriaForm((prev) => ({
      ...prev,
      [field]: field === "dias_horarios" ? [...value] : value,
    }));
  };

  const handleCheckboxChange = (id) => {
    const updated = materiaForm.dias_horarios.includes(id)
      ? materiaForm.dias_horarios.filter((h) => h !== id)
      : [...materiaForm.dias_horarios, id];

    handleMateriaFieldChange("dias_horarios", updated);
  };

  const addOrUpdateMateria = () => {
    const updatedMaterias = [...formData.materias];
    if (editingIndex !== null) {
      updatedMaterias[editingIndex] = materiaForm;
    } else {
      updatedMaterias.push(materiaForm);
    }

    setFormData((prev) => ({ ...prev, materias: updatedMaterias }));
    setMateriaForm({ materia_id: "", dias_horarios: [] });
    setEditingIndex(null);
    setShowMateriaForm(false);
  };

  const handleEditMateria = (index) => {
    setMateriaForm(formData.materias[index]);
    setEditingIndex(index);
    setShowMateriaForm(true);
  };

  const handleRemoveMateria = (index) => {
    const updatedMaterias = [...formData.materias];
    updatedMaterias.splice(index, 1);
    setFormData((prev) => ({ ...prev, materias: updatedMaterias }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const preparedData = new FormData();
    preparedData.append("name", formData.name);
    preparedData.append("email", formData.email);
    if (formData.foto) {
      preparedData.append("foto", formData.foto);
    }
    preparedData.append("materias", JSON.stringify(formData.materias));
    onSubmit(preparedData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-3xl mx-auto mt-6"
    >
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">
        {isEditing ? "Editar Profesor" : "Registrar Profesor"}
      </h2>

      {/* Datos básicos */}
      <div className="flex items-center gap-2 mb-3">
        <FaUser className="text-primary" />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <FaEnvelope className="text-primary" />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <FaPhotoVideo className="text-primary" />
        <input
          type="file"
          name="foto"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />
      </div>

      {/* Materias asignadas */}
      <h3 className="text-lg font-semibold text-primary mt-6 mb-2">
        Materias Asignadas
      </h3>

      {formData.materias.map((m, index) => {
        const materia = materiasOptions.find((mat) => mat.id === m.materia_id);
        return (
          <div key={index} className="border p-3 rounded-lg mb-2 flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <p className="font-medium">
                {materia?.sigla} - {materia?.nombre}
              </p>
              <p className="text-sm text-gray-600">
                Horarios:{" "}
                {m.dias_horarios
                  .map((id) => {
                    const h = horariosOptions.find((hh) => hh.id === id);
                    return h
                      ? `${h.dias.join(", ")} (${h.hora_inicio} - ${h.hora_final})`
                      : "";
                  })
                  .join(" | ")}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="text-blue-600"
                onClick={() => handleEditMateria(index)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="text-red-600"
                onClick={() => handleRemoveMateria(index)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}

      {/* Botón para agregar materia */}
      {!showMateriaForm && (
        <button
          type="button"
          className="flex items-center gap-2 text-primary my-4"
          onClick={() => {
            setMateriaForm({ materia_id: "", dias_horarios: [] });
            setEditingIndex(null);
            setShowMateriaForm(true);
          }}
        >
          <FaPlus /> Agregar nueva materia
        </button>
      )}

      {/* Formulario de materia */}
      {showMateriaForm && (
        <div className="border p-4 mb-4 rounded-xl bg-gray-50">
          <div className="flex gap-2 mb-2">
            <select
              className="w-full border rounded-lg p-2"
              value={materiaForm.materia_id}
              onChange={(e) =>
                handleMateriaFieldChange("materia_id", parseInt(e.target.value))
              }
              required
            >
              <option value="">Selecciona una materia</option>
              {materiasOptions.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.sigla} - {m.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="max-h-48 overflow-y-auto border rounded-lg p-2 grid grid-cols-1 gap-1">
            {horariosOptions.map((h) => (
              <label key={h.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={materiaForm.dias_horarios.includes(h.id)}
                  onChange={() => handleCheckboxChange(h.id)}
                />
                <span>
                  {h.dias.join(", ")} ({h.hora_inicio} - {h.hora_final})
                </span>
              </label>
            ))}
          </div>

          <div className="flex gap-4 mt-3 justify-end">
            <button
              type="button"
              className="text-red-600"
              onClick={() => {
                setShowMateriaForm(false);
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

      {/* Botón submit */}
      <button
        type="submit"
        className="w-full btn-primary font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
      >
        <FaSave />
        {isEditing ? "Actualizar" : "Crear"} Profesor
      </button>
    </form>
  );
};

export default ProfesorForm;
