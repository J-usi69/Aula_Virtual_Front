import { useEffect, useState } from "react";
import EstudianteForm from "../../components/admin/EstudianteForm";
import EstudianteList from "../../components/admin/EstudianteList";
import {
  getEstudiantes,
  createEstudiante,
  patchEstudiante,
  deleteEstudiante,
} from "../../services/estudianteService";

const EstudiantePage = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchEstudiantes = async () => {
    const data = await getEstudiantes();
    setEstudiantes(data);
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const handleCreateOrUpdate = async (data) => {
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }


    if (isEditing && selectedEstudiante) {
      await patchEstudiante(selectedEstudiante.estudiante_id, data);
    } else {
      
      await createEstudiante(data);
    }

    setIsEditing(false);
    setSelectedEstudiante(null);
    setShowForm(false);
    fetchEstudiantes();
  };

  const handleEdit = (estudiante) => {
    setSelectedEstudiante(estudiante);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteEstudiante(id);
    fetchEstudiantes();
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedEstudiante(null);
    setIsEditing(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-xl mx-auto max-w-7xl">
      {!showForm ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary text-center sm:text-left">
              Estudiantes
            </h1>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedEstudiante(null);
                setShowForm(true);
              }}
              className="btn-primary px-4 py-2 rounded-lg text-white hover:bg-primary-dark transition"
            >
              + Agregar Estudiante
            </button>
          </div>

          <EstudianteList
            estudiantes={estudiantes}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <EstudianteForm
          onSubmit={handleCreateOrUpdate}
          initialData={selectedEstudiante}
          isEditing={isEditing}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default EstudiantePage;
