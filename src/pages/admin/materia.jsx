import { useEffect, useState } from "react";
import {
  getMaterias,
  createMateria,
  updateMateria,
  deleteMateria,
} from "../../services/materiasService";
import MateriaList from "../../components/admin/MateriaList";
import MateriaForm from "../../components/admin/MateriaForm";


const MateriaPage = () => {
  const [materias, setMaterias] = useState([]);
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchMaterias = async () => {
    const data = await getMaterias();
    setMaterias(data);
  };

  useEffect(() => {
    fetchMaterias();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (isEditing && selectedMateria) {
        await updateMateria(formData, selectedMateria.id);
      } else {
        await createMateria(formData);
      }

      setIsEditing(false);
      setSelectedMateria(null);
      fetchMaterias();
    } catch (error) {
      console.error("Error al guardar materia:", error);
    }
  };

  const handleEdit = (materia) => {
    setSelectedMateria(materia);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteMateria(id);
      fetchMaterias();
    } catch (error) {
      console.error("Error al eliminar materia:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-xl mx-auto max-w-7xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4 text-center">
        Gestión de Materias
      </h1>

      <MateriaForm
        onSubmit={handleCreateOrUpdate}
        initialData={selectedMateria}
        isEditing={isEditing}
      />

      <MateriaList
        materias={materias}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};


export default MateriaPage;
