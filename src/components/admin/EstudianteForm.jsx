import { useState, useEffect } from "react";
import {
  FaSave,
  FaTimes,
  FaSearch,
  FaUserPlus,
  FaTrash,
  FaUser,
  FaIdCard,
  FaVenusMars,
  FaPhone,
  FaEnvelope,
  FaKey,
  FaCamera,
  FaUserTag,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { getApoderadoByCi } from "../../services/apoderadoService";
import { useAuth } from "../../hooks/useAuth";

const EstudianteForm = ({ onSubmit, initialData = {}, isEditing = false, onCancel }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    ci: "",
    sexo: "",
    telefono: "",
    email: "",
    password: "",
    name: "",
    users_id: user?.id || "",
    photo: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [parentescos, setParentescos] = useState([]);
  const [apoderadoCI, setApoderadoCI] = useState("");
  const [apoderadoEncontrado, setApoderadoEncontrado] = useState(null);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        nombre: initialData.nombre || "",
        apellido: initialData.apellido || "",
        ci: initialData.ci || "",
        sexo: initialData.sexo || "",
        telefono: initialData.telefono || "",
        email: initialData.user?.email || "",
        password: "", 
        name: initialData.user?.name || "",
        users_id: initialData.users_id || user?.id || "",
        photo: null,
      });

      if (Array.isArray(initialData.apoderados)) {
        const parentescoList = initialData.apoderados.map((a) => ({
          ci: a.apoderado.ci,
          tipo: a.tipo,
        }));
        setParentescos(parentescoList);
      }
    }
  }, [initialData, user]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBuscarApoderado = async () => {
    try {
      const resultado = await getApoderadoByCi(apoderadoCI);
      if (Array.isArray(resultado) && resultado.length > 0) {
        setApoderadoEncontrado(resultado[0]);
      } else {
        setApoderadoEncontrado(null);
      }
    } catch (error) {
      console.error("Error buscando apoderado:", error);
      setApoderadoEncontrado(null);
    }
  };

  const handleAgregarParentesco = (tipo) => {
    if (!apoderadoEncontrado) return;

    const yaExiste = parentescos.some(p => p.ci === apoderadoEncontrado.ci);
    if (yaExiste) {
      alert("Este apoderado ya ha sido agregado.");
      return;
    }

    setParentescos(prev => [...prev, { ci: apoderadoEncontrado.ci, tipo }]);
    setApoderadoEncontrado(null);
    setApoderadoCI("");
  };

  const handleRemoveParentesco = (index) => {
    setParentescos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      finalData.append(key, value);
    });
    finalData.append("parentescos", JSON.stringify(parentescos));
    onSubmit(finalData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl p-6 rounded-2xl w-full max-w-7xl mx-auto mt-6"
    >
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        {isEditing ? "Editar Estudiante" : "Registrar Estudiante"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} icon={<FaUser />} placeholder="Ej. Juan" />
        <Input label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} icon={<FaUser />} placeholder="Ej. Pérez" />
        <Input label="CI" name="ci" value={formData.ci} onChange={handleChange} icon={<FaIdCard />} placeholder="Ej. 12345678" />
        <Input label="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} icon={<FaPhone />} placeholder="Ej. 77777777" />
        <Input label="Email" name="email" value={formData.email} onChange={handleChange} icon={<FaEnvelope />} placeholder="correo@ejemplo.com" type="email" />
        <Input label="Nombre de Usuario" name="name" value={formData.name} onChange={handleChange} icon={<FaUserTag />} placeholder="Ej. jperez01" />

        <div className="w-full relative">
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
            <FaKey /> Contraseña:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            className="w-full px-4 py-2 border rounded-lg pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500"
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="w-full">
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
            <FaVenusMars /> Sexo:
          </label>
          <select
            name="sexo"
            value={formData.sexo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="" disabled>Seleccione sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>

        <div className="w-full">
          <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
            <FaCamera /> Foto:
          </label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>
      </div>

      {/* Buscar Apoderado */}
      <div className="bg-gray-100 p-4 rounded-xl mb-4">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <FaSearch /> Buscar Apoderado
        </h3>
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <input
            type="text"
            placeholder="CI del apoderado"
            value={apoderadoCI}
            onChange={(e) => setApoderadoCI(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full"
          />
          <button
            type="button"
            onClick={handleBuscarApoderado}
            className="btn-primary flex items-center justify-center gap-2 px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            <FaSearch /> Buscar
          </button>
        </div>

        {apoderadoEncontrado && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 p-3 border rounded-lg bg-white shadow-sm gap-2">
            <span className="font-medium">
              {apoderadoEncontrado.nombre} {apoderadoEncontrado.apellido} (CI: {apoderadoEncontrado.ci})
            </span>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {["Padre", "Madre", "Tutor"].map((tipo) => (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => handleAgregarParentesco(tipo)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg flex items-center justify-center gap-1 w-full sm:w-auto"
                >
                  <FaUserPlus /> {tipo}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lista de apoderados agregados */}
      {parentescos.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Apoderados seleccionados:</h4>
          <ul className="space-y-2">
            {parentescos.map((p, i) => (
              <li key={i} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <span>{`CI: ${p.ci} - Tipo: ${p.tipo}`}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveParentesco(i)}
                  className="text-red-600 hover:text-red-800 font-bold px-2"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botones */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:justify-start">
        <button
          type="submit"
          className="btn-primary font-semibold px-6 py-2 rounded-lg transition flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <FaSave /> {isEditing ? "Actualizar" : "Registrar"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <FaTimes /> Cancelar
        </button>
      </div>
    </form>
  );
};

const Input = ({ label, name, value, onChange, icon, placeholder, type = "text" }) => (
  <div className="w-full">
    <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
      {icon} {label}:
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-lg"
      required
    />
  </div>
);

export default EstudianteForm;
