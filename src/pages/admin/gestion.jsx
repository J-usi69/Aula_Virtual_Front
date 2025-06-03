import { useEffect, useState } from "react";
import {
  getgestion,
  createGestion,
  patchGestion,
  deleteGestion,
} from "../../services/gestionServices";
import GestionForm from "../../components/admin/GestionForm";
import GestionList from "../../components/admin/GestionList";

const GestionPage = () => {
  const [gestiones, setGestiones] = useState([]);
  const [selectedGestion, setSelectedGestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchGestiones = async () => {
    try {
      const data = await getgestion();
      setGestiones(data);
    } catch (error) {
      console.error("Error al obtener gestiones:", error);
    }
  };

  useEffect(() => {
    fetchGestiones();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (isEditing && selectedGestion) {
        await patchGestion(formData, selectedGestion.id);
      } else {
        await createGestion(formData);
      }

      setIsEditing(false);
      setSelectedGestion(null);
      fetchGestiones();
    } catch (error) {
      console.error("Error al guardar gestión:", error);
    }
  };

  const handleEdit = (gestion) => {
    setSelectedGestion(gestion);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteGestion(id);
      fetchGestiones();
    } catch (error) {
      console.error("Error al eliminar gestión:", error);
    }
  };

  const handleCancel = () => {
    setSelectedGestion(null);
    setIsEditing(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-xl mx-auto max-w-7xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
        Gestión de Gestiones Escolares
      </h1>

      <GestionForm
        onSubmit={handleCreateOrUpdate}
        initialData={selectedGestion}
        isEditing={isEditing}
        onCancel={handleCancel}
      />

      <GestionList
        gestiones={gestiones}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default GestionPage;
