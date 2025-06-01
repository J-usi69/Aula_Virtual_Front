import { useEffect, useState } from "react";
import ProfesorForm from "../../components/admin/ProfesorForm";
import ProfesorList from "../../components/admin/ProfesorList";
import {
  getProfesor,
  createProfesor,
  deleteProfesor,
  patchProfesor,
} from "../../services/profesorService";

const ProfesorPage = () => {
  const [profesores, setProfesores] = useState([]);
  const [selectedProfesor, setSelectedProfesor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchProfesores = async () => {
    const data = await getProfesor();
    setProfesores(data);
  };

  useEffect(() => {
    fetchProfesores();
  }, []);

  const handleCreateOrUpdate = async (formData) => {

    const id = formData.get("id");

      for (const pair of formData.entries()) {
        console.log(pair[0], ":", pair[1]);
      }

    if (isEditing && id) {
      await patchProfesor(id, formData);
    } else {
      
      await createProfesor(formData);
    }

    setIsEditing(false);
    setSelectedProfesor(null);
    setShowForm(false);
    fetchProfesores();
  };

  const handleEdit = (profesor) => {
    setSelectedProfesor(profesor);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteProfesor(id);
    fetchProfesores();
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedProfesor(null);
    setIsEditing(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-xl mx-auto max-w-7xl">
      {!showForm ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary text-center sm:text-left">
              Profesores
            </h1>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedProfesor(null);
                setShowForm(true);
              }}
              className="btn-primary px-4 py-2 rounded-lg text-white hover:bg-primary-dark transition"
            >
              + Agregar Profesor
            </button>
          </div>

          <ProfesorList
            profesores={profesores}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <ProfesorForm
          onSubmit={handleCreateOrUpdate}
          initialData={selectedProfesor}
          isEditing={isEditing}
          onCancelEdit={handleCancel}
          userId={"1"} 
        />
      )}
    </div>
  );
};

export default ProfesorPage;
