import { useState, useEffect } from "react";
import { FaIdCard, FaSearch, FaCalendarAlt, FaMoneyBill } from "react-icons/fa";
import { getSubgestiones, getEstudianteByCI, createMatricula } from "../../services/pagoMatricula";
import { useAuth } from "../../hooks/useAuth";

export default function PagoMatriculaForm({ onMatriculaRegistrada }) {
  const { user } = useAuth();
  const [ci, setCi] = useState("");
  const [estudiante, setEstudiante] = useState(null);
  const [subgestionId, setSubgestionId] = useState("");
  const [subgestiones, setSubgestiones] = useState([]);
  const [fecha, setFecha] = useState("");
  const [monto, setMonto] = useState("");

  useEffect(() => {
    getSubgestiones().then(setSubgestiones);
  }, []);

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
      console.error(error);
      alert("Error al buscar estudiante");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!estudiante || !subgestionId || !fecha || !monto)
      return alert("Completa todos los campos");

    const payload = {
      ci_estudiante: estudiante.ci,
      subgestion_id: parseInt(subgestionId),
      monto: parseFloat(monto),
      fecha,
      users_id: user.id,
    };

    console.log("Payload enviado:", payload);


    try {
      await createMatricula(payload);
      onMatriculaRegistrada();
      limpiarFormulario();
    } catch (error) {
      console.error(error);
      alert("Error al registrar pago");
    }
  };

  const limpiarFormulario = () => {
    setCi("");
    setEstudiante(null);
    setSubgestionId("");
    setFecha("");
    setMonto("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
      <h2 className="text-xl font-semibold mb-6 text-primary flex items-center gap-2">
        <FaIdCard />
        Registrar Pago de Matrícula
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CI estudiante */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">CI del estudiante</label>
          <div className="flex gap-2 items-center">
            <div className="relative w-full">
              <input
                type="text"
                value={ci}
                onChange={(e) => setCi(e.target.value)}
                className="border rounded px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Ingrese CI"
              />
              <FaIdCard className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button
              type="button"
              onClick={buscarEstudiante}
              className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg"
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

        {/* Subgestión */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subgestión</label>
          <div className="relative">
            <select
              value={subgestionId}
              onChange={(e) => setSubgestionId(e.target.value)}
              className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Seleccionar...</option>
              {subgestiones.map((sub) => (
                <option key={sub.subgestion_id} value={sub.subgestion_id}>
                  {sub.gestion_nombre} - {sub.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
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

        {/* Monto */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="border rounded px-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="150.00"
            />
            <FaMoneyBill className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
          Registrar
        </button>
      </div>
    </form>
  );
}
