import { useState, useEffect } from "react";
import { FaBook, FaSave, FaTimes } from "react-icons/fa";

const MateriaForm = ({ onSubmit, initialData, isEditing, onCancel }) => {
  const [formData, setFormData] = useState({ sigla: "", nombre: "" });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ sigla: "", nombre: "" });
  };

  const handleCancel = () => {
    setFormData({ sigla: "", nombre: "" });
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-7xl mx-auto mt-6"
    >
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">
        {isEditing ? "Editar Materia" : "Registrar Materia"}
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <div className="flex-1 w-full">
          <label className="text-gray-700 font-medium block mb-1">Sigla:</label>
          <input
            type="text"
            name="sigla"
            value={formData.sigla}
            onChange={handleChange}
            placeholder="Ej. INF101"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="flex-1 w-full">
          <label className="text-gray-700 font-medium block mb-1">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej. Introducción a la Informática"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="flex flex-col gap-2 mt-2 md:mt-6">
          <button
            type="submit"
            className="btn-primary font-semibold px-6 py-2 rounded-lg transition flex items-center gap-2"
          >
            <FaSave />
            {isEditing ? "Actualizar" : "Crear"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition flex items-center gap-2"
            >
              <FaTimes />
              Cancelar
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default MateriaForm;
