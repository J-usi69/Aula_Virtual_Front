import { useEffect, useState } from "react";
import ApoderadoForm from "../../components/admin/ApoderadoForm";
import ApoderadoTable from "../../components/admin/ApoderadoTable ";
import {
  getApoderados,
  createApoderado,
  patchApoderado,
  deleteApoderado,
} from "../../services/apoderadoService";

const ApoderadoPage = () => {
  const [apoderados, setApoderados] = useState([]);
  const [selectedApoderado, setSelectedApoderado] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchApoderados = async () => {
    const data = await getApoderados();
    setApoderados(data);
  };

  useEffect(() => {
    fetchApoderados();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    const id = formData.get("apoderado_id");

    /*for (const pair of formData.entries()) {
      console.log(pair[0], ":", pair[1]);
    }*/

    if (isEditing && id) {
      await patchApoderado(id, formData);
    } else {
      await createApoderado(formData);
    }

    setIsEditing(false);
    setSelectedApoderado(null);
    setShowForm(false);
    fetchApoderados();
  };

  const handleEdit = (apoderado) => {
    setSelectedApoderado(apoderado);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteApoderado(id);
    fetchApoderados();
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedApoderado(null);
    setIsEditing(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-xl mx-auto max-w-7xl">
      {!showForm ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary text-center sm:text-left">
              Apoderados
            </h1>
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedApoderado(null);
                setShowForm(true);
              }}
              className="btn-primary px-4 py-2 rounded-lg text-white hover:bg-primary-dark transition"
            >
              + Agregar Apoderado
            </button>
          </div>

          <ApoderadoTable
            apoderados={apoderados}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </>
      ) : (
        <ApoderadoForm
          onSubmit={handleCreateOrUpdate}
          initialData={selectedApoderado}
          isEditing={isEditing}
          onCancelEdit={handleCancel}
          userId={"1"} 
        />
      )}
    </div>
  );
};

export default ApoderadoPage;
