import { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaSave,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaPhone,
  FaIdCard,
  FaVenusMars,
} from "react-icons/fa";

const ApoderadoForm = ({
  onSubmit,
  initialData,
  isEditing,
  onCancelEdit,
  userId,
}) => {
  const [formData, setFormData] = useState({
    apoderado_id: "",
    name: "",
    email: "",
    password: "",
    ci: "",
    nombre: "",
    apellido: "",
    sexo: "",
    telefono: "",
    photo: null,
  });

  const [nameManuallyEdited, setNameManuallyEdited] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        apoderado_id: initialData.apoderado_id || "",
        name: initialData.user.name || "",
        email: initialData.user.email || "",
        password: "",
        ci: initialData.ci || "",
        nombre: initialData.nombre || "",
        apellido: initialData.apellido || "",
        sexo: initialData.sexo || "",
        telefono: initialData.telefono || "",
        photo: null,
      });
      setNameManuallyEdited(true);
    }
  }, [initialData]);

  const generarUsername = (nombre, apellido) => {
    const primeraSilaba = nombre.slice(0, 2).toLowerCase();
    const finalApellido = apellido.slice(-3).toLowerCase();
    return primeraSilaba + finalApellido;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (!nameManuallyEdited && (name === "nombre" || name === "apellido")) {
        const nombre = name === "nombre" ? value : updated.nombre;
        const apellido = name === "apellido" ? value : updated.apellido;
        updated.name = generarUsername(nombre, apellido);
      }

      return updated;
    });
  };

  const handleNameChange = (e) => {
    setNameManuallyEdited(true);
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = new FormData();

    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== "") {
        dataToSend.append(key, formData[key]);
      }
    }

    if (userId) {
      dataToSend.append("users_id", String(userId));
    }

    onSubmit(dataToSend);
    handleClear();
  };

  const handleClear = () => {
    setFormData({
      apoderado_id: "",
      name: "",
      email: "",
      password: "",
      ci: "",
      nombre: "",
      apellido: "",
      sexo: "",
      telefono: "",
      photo: null,
    });
    setNameManuallyEdited(false);
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-dark-700 shadow-md p-4 sm:p-6 rounded-2xl mb-6 w-full"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-primary mb-6">
        {isEditing ? "Editar Apoderado" : "Registrar Apoderado"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <InputField
          icon={<FaUser />}
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
        />
        <InputField
          icon={<FaUser />}
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          placeholder="Apellido"
        />
        <InputField
          icon={<FaIdCard />}
          name="ci"
          value={formData.ci}
          onChange={handleChange}
          placeholder="Cédula de identidad"
        />
        <InputField
          icon={<FaPhone />}
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
        />
        {/* Select para Sexo */}
        <div className="relative flex items-center">
          <FaVenusMars className="absolute left-3 text-primary" />
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            required
          >
            <option value="">Selecciona sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <InputField
          icon={<FaUser />}
          name="name"
          value={formData.name}
          onChange={handleNameChange}
          placeholder="Nombre de usuario"
        />
        <InputField
          icon={<FaEnvelope />}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
        />
        {/* Contraseña */}
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
        {/* Foto */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Foto</label>
          <input type="file" onChange={handleFileChange} />
        </div>
      </div>

      {isEditing && (
        <p className="text-sm text-gray-500 italic mb-4">
          Deja la contraseña vacía si no deseas cambiarla.
        </p>
      )}

      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <button
          type="submit"
          className="btn-primary px-6 py-2 rounded-lg text-white font-semibold flex items-center gap-2"
        >
          <FaSave />
          {isEditing ? "Actualizar" : "Crear"} Apoderado
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
        >
          <FaTimes />
          Cancelar
        </button>
      </div>
    </form>
  );
};

const InputField = ({
  icon,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div className="relative flex items-center">
    <span className="absolute left-3 text-primary">{icon}</span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
      required
    />
  </div>
);

export default ApoderadoForm;
