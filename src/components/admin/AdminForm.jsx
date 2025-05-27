import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaSave,
  FaTimes,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

const AdminForm = ({ onSubmit, initialData, isEditing, onCancelEdit }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData, password: "" }); 
    } else {
      setFormData({ name: "", email: "", password: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    handleClear();
  };

  const handleClear = () => {
    setFormData({ name: "", email: "", password: "" });
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-dark-700 shadow-md p-4 sm:p-6 rounded-2xl mb-6 w-full"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">
        {isEditing ? "Editar Administrador" : "Registrar Administrador"}
      </h2>

      <div className="flex flex-col gap-6 mb-6">


        <div className="space-y-4">
          <div className="relative flex items-center">
            <FaUser className="absolute left-3 text-primary" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>

          <div className="relative flex items-center">
            <FaEnvelope className="absolute left-3 text-primary" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative flex items-center">
            <FaLock className="absolute left-3 text-primary" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none"
              required={!isEditing}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {isEditing && (
            <p className="text-sm text-gray-500 italic mt-1">
              Deja este campo vacío si no deseas cambiar la contraseña.
            </p>
          )}

          <div className="flex flex-col gap-2 w-full sm:w-64 sm:ml-auto">
            <button
              type="submit"
              className="w-full btn-primary px-6 py-2 rounded-lg text-white font-semibold flex items-center justify-center gap-2"
            >
              <FaSave />
              {isEditing ? "Actualizar" : "Crear"} Administrador
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="w-full bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <FaTimes />
              Cancelar
            </button>
          </div>



        </div>
      </div>
    </form>
  );
};

export default AdminForm;
