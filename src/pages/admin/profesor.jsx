import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import ProfesorForm from "../../components/admin/ProfesorForm";
import ProfesorList from "../../components/admin/ProfesorList";
import {
  getProfesor,
  createProfesor,
  deleteProfesor,
  patchProfesor
} from "../../services/profesorService";

const ProfesorPage = () => {
  const [profesores, setProfesores] = useState([]);
  const [selectedProfesor, setSelectedProfesor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchProfesores = async () => {
    const data = await getProfesor();
    setProfesores(data);
  };

  useEffect(() => {
    fetchProfesores();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    const form = new FormData();
    form.append("nombre", formData.nombre);
    form.append("apellido", formData.apellido);
    form.append("ci", formData.ci);
    form.append("correo", formData.correo);
    if (formData.foto) {
      form.append("foto", formData.foto);
    }
    form.append("materias", JSON.stringify(formData.materias));

    if (isEditing) {
      await patchProfesor(formData.id, form);
      setIsEditing(false);
      setSelectedProfesor(null);
    } else {
      await createProfesor(form);
    }

    setShowModal(false);
    fetchProfesores();
  };

  const handleEdit = (profesor) => {
    setSelectedProfesor(profesor);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await deleteProfesor(id);
    fetchProfesores();
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-xl mx-auto max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary text-center sm:text-left">
          Profesores
        </h1>
        <button
          onClick={() => {
            setIsEditing(false);
            setSelectedProfesor(null);
            setShowModal(true);
          }}
          className="btn-primary px-4 py-2 rounded-lg text-white hover:bg-primary-dark transition"
        >
          + Agregar Profesor
        </button>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ProfesorForm
            onSubmit={handleCreateOrUpdate}
            initialData={selectedProfesor}
            isEditing={isEditing}
          />
        </Modal>
      )}

      <ProfesorList profesores={profesores} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ProfesorPage;
