import { useEffect, useState } from "react";
import HorarioForm from "../../components/admin/HorarioForm";
import HorarioList from "../../components/admin/HorarioList";
import {
  createHorario,
  deleteHorario,
  getHorarios,
  updateHorario
} from "../../services/horariosService";

const HorarioPage = () => {
  const [horarios, setHorarios] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchHorarios = async () => {
    const data = await getHorarios();
    setHorarios(data);
  };

  useEffect(() => {
    fetchHorarios();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    if (isEditing) {
      await updateHorario(formData, selectedHorario.id);
      setIsEditing(false);
      setSelectedHorario(null);
    } else {
      await createHorario(formData);
    }
    fetchHorarios();
  };

  const handleEdit = (horario) => {
    setSelectedHorario(horario);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este horario?")) {
      await deleteHorario(id);
      fetchHorarios();
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedHorario(null);
  };

  return (
    <div className="p-4 sm:p-6 dark:bg-dark-800 rounded-xl mx-auto max-w-7xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6 text-center sm:text-left">
        Gestión de Horarios
      </h1>

      <div className="flex flex-col lg:flex-row gap-3">
        <div className="w-full lg:w-1/3">
          <HorarioForm
            onSubmit={handleCreateOrUpdate}
            initialData={selectedHorario}
            isEditing={isEditing}
            onCancelEdit={handleCancelEdit}
          />
        </div>
        <div className="w-full lg:w-2/3 h-full min-h-[450px]">
          <HorarioList
            horarios={horarios}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );

};

export default HorarioPage;
