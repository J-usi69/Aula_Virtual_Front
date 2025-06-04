import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getProfesorGestion } from "../../services/ProfesorAulaService";
import materiaImg from "../../assets/materia.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const [materias, setMaterias] = useState([]);
<<<<<<< HEAD
=======
  const [filteredMaterias, setFilteredMaterias] = useState([]);
  const [gestiones, setGestiones] = useState([]);
  const [selectedGestion, setSelectedGestion] = useState("");
>>>>>>> upstream/main
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const data = await getProfesorGestion(user.profesor.id);
<<<<<<< HEAD
        console.log("Profesor ID:", user.profesor.id);
        const gestionCursoMateria = [];

        data.gestion.forEach((gestion) => {
=======
        const gestionCursoMateria = [];
        const gestionesSet = new Set();

        data.gestion.forEach((gestion) => {
          gestionesSet.add(gestion.gestion_nombre);
>>>>>>> upstream/main
          gestion.gestion_curso_paralelo.forEach((gcp) => {
            gcp.materia.forEach((mat) => {
              mat.cursos_paralelo.forEach((cp) => {
                gestionCursoMateria.push({
                  gestion: gestion.gestion_nombre,
                  materia: mat.materia_nombre,
                  materia_id: mat.materia_id,
                  curso: cp.curso_nombre,
                  paralelo: cp.paralelo_nombre,
                  paralelo_id: cp.paralelo_id,
                  horario: cp.horario,
                  gestion_curso_paralelo_id: gcp.gestion_curso_paralelo_id,
                });
              });
            });
          });
        });

        setMaterias(gestionCursoMateria);
<<<<<<< HEAD
=======
        setFilteredMaterias(gestionCursoMateria);
        setGestiones(Array.from(gestionesSet));
>>>>>>> upstream/main
      } catch (error) {
        console.error("Error al cargar las materias del profesor:", error);
      }
    };

    if (user?.profesor?.id) {
      fetchMaterias();
    }
  }, [user]);

<<<<<<< HEAD
  return (
    <div className="p-4 mt-5 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <h1 className="text-2xl font-bold mb-6 col-span-full">Materias Asignadas</h1>
      {materias.map((item, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center text-center">
          <img src={materiaImg} alt="Materia" className="h-24 mb-4" />
          <h3 className="text-lg font-bold mb-1">{item.materia}</h3>
          <p className="text-sm text-gray-600 mb-1">
            {item.gestion} - {item.curso} "{item.paralelo}"
          </p>
          <p className="text-sm text-gray-600 mb-4">
            {item.horario?.dias?.join(", ")}<br />
            {item.horario?.horario_inicio} - {item.horario?.horario_final}
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={() => navigate(`/profesor/participacion/${item.gestion_curso_paralelo_id}/${item.materia_id}/${item.paralelo_id}`)}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-xl"
            >
              Participación
            </button>
            <button
              onClick={() => navigate(`/profesor/asistencia/${item.gestion_curso_paralelo_id}/${item.materia_id}/${item.paralelo_id}`)}
              className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-xl"
            >
              Asistencia
            </button>
            <button
              onClick={() => navigate(`/nota/${item.gestion_curso_paralelo_id}/${item.materia_id}/${item.paralelo_id}`)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded-xl"
            >
              Nota
            </button>
          </div>
        </div>
      ))}
=======
  useEffect(() => {
    if (selectedGestion) {
      setFilteredMaterias(materias.filter((m) => m.gestion === selectedGestion));
    } else {
      setFilteredMaterias(materias);
    }
  }, [selectedGestion, materias]);

  return (
    <div className="p-4 mt-5">
      <h1 className="text-2xl font-bold mb-4">Materias Asignadas</h1>

      <div className="mb-6">
        <label className="mr-2 font-semibold">Filtrar por Gestión:</label>
        <select
          value={selectedGestion}
          onChange={(e) => setSelectedGestion(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1"
        >
          <option value="">Todas</option>
          {gestiones.map((gestion, idx) => (
            <option key={idx} value={gestion}>
              {gestion}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredMaterias.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center text-center"
          >
            <img src={materiaImg} alt="Materia" className="h-24 mb-4" />
            <h3 className="text-lg font-bold mb-1">{item.materia}</h3>
            <p className="text-sm text-gray-600 mb-1">
              {item.gestion} - {item.curso} "{item.paralelo}"
            </p>
            <p className="text-sm text-gray-600 mb-4">
              {item.horario?.dias?.join(", ")}<br />
              {item.horario?.horario_inicio} - {item.horario?.horario_final}
            </p>
            <div className="flex gap-2 flex-wrap justify-center">
              <button
                onClick={() =>
                  navigate(
                    `/profesor/participacion/${item.gestion_curso_paralelo_id}/${item.materia_id}/${item.paralelo_id}`
                  )
                }
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-xl"
              >
                Participación
              </button>
              <button
                onClick={() =>
                  navigate(
                    `/profesor/asistencia/${item.gestion_curso_paralelo_id}/${item.materia_id}/${item.paralelo_id}`
                  )
                }
                className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-xl"
              >
                Asistencia
              </button>
              <button
                onClick={() =>
                  navigate(
                    `/profesor/notas/${item.gestion_curso_paralelo_id}/${item.materia_id}/${item.paralelo_id}`
                  )
                }
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded-xl"
              >
                Nota
              </button>
            </div>
          </div>
        ))}
      </div>
>>>>>>> upstream/main
    </div>
  );
};

export default Home;
