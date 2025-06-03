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
  FaMapMarkerAlt,
  FaIdCard,
} from "react-icons/fa";
import AsignacionMateriasForm from "../otrosComponentes/AsignacionMateriasForm";

const ProfesorForm = ({
  onSubmit,
  initialData,
  isEditing,
  onCancelEdit,
  userId,
}) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    ci: "",
    nombre_prof: "",
    apellido_prof: "",
    telefono: "",
    direccion: "",
    photo: null,
    materias: [],
  });

  const [nameManuallyEdited, setNameManuallyEdited] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.profesor.id || "",
        nombre_prof: initialData.profesor.nombre_profesor || "",
        apellido_prof: initialData.profesor.apellido_profesor || "",
        ci: initialData.profesor.ci ? String(initialData.profesor.ci) : "",
        telefono: initialData.profesor.telefono ? String(initialData. profesor.telefono) : "",
        direccion: initialData.profesor.direccion || "",
        name: initialData.user?.name || "",
        email: initialData.user?.email || "",
        password: "",
        photo: null,
        materias: initialData.materias || [],
      });
      setNameManuallyEdited(true);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };

      if (
        !nameManuallyEdited &&
        (name === "nombre_prof" || name === "apellido_prof")
      ) {
        const nombre = name === "nombre_prof" ? value : updatedForm.nombre_prof;
        const apellido =
          name === "apellido_prof" ? value : updatedForm.apellido_prof;

        const newName = (nombre + apellido).toLowerCase().replace(/\s+/g, "");
        updatedForm.name = newName;
      }

      return updatedForm;
    });
  };

  const handleNameChange = (e) => {
    setNameManuallyEdited(true);
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleMateriasChange = (materias) => {
    setFormData((prev) => ({ ...prev, materias }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = new FormData();

    for (const key in formData) {
      if (key === "materias") {
        dataToSend.append("materias", JSON.stringify(formData.materias));
      } else if (formData[key] !== null && formData[key] !== "") {
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
      id: "",
      name: "",
      email: "",
      password: "",
      ci: "",
      nombre_prof: "",
      apellido_prof: "",
      telefono: "",
      direccion: "",
      photo: null,
      materias: [],
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
        {isEditing ? "Editar Profesor" : "Registrar Profesor"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <InputField
          icon={<FaUser />}
          name="nombre_prof"
          value={formData.nombre_prof}
          onChange={handleChange}
          placeholder="Nombre"
        />

        <InputField
          icon={<FaUser />}
          name="apellido_prof"
          value={formData.apellido_prof}
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

        <InputField
          icon={<FaMapMarkerAlt />}
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          placeholder="Dirección"
        />

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

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Foto</label>
          <input type="file" onChange={handleFileChange} />
        </div>
      </div>

      {/* Asignación de materias */}
      <AsignacionMateriasForm
        selectedMaterias={formData.materias}
        onChange={handleMateriasChange}
      />

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
          {isEditing ? "Actualizar" : "Crear"} Profesor
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

export default ProfesorForm;
