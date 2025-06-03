import { useEffect, useState } from "react";
import AdminForm from "../../components/admin/AdminForm";
import AdminTable from "../../components/admin/AdminTable";
import {
  createAdmin,
  deleteAdmin,
  getAdmins,
  patchAdmin
} from "../../services/adminService";

const AdminPage = () => {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchAdmins = async () => {
    const data = await getAdmins();
    setAdmins(data);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);

    if (formData.password && formData.password.trim() !== "") {
      form.append("password", formData.password);
    }

    if (isEditing) {
      await patchAdmin(formData.id, form);
    } else {
      if (!formData.password || formData.password.trim() === "") {
        alert("La contraseña es obligatoria al crear.");
        return;
      }
      await createAdmin(form);
    }

    setIsEditing(false);
    setSelectedAdmin(null);
    fetchAdmins();
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setSelectedAdmin(null);
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    await deleteAdmin(id);
    fetchAdmins();
  };

  return (
    <div className="p-4 sm:p-6 dark:bg-dark-800 rounded-xl mx-auto max-w-7xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6 text-center sm:text-left">
        Gestión de Administradores
      </h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <AdminForm
            onSubmit={handleCreateOrUpdate}
            initialData={selectedAdmin}
            isEditing={isEditing}
            onCancelEdit={handleCancelEdit}
          />
        </div>
        <div className="w-full lg:w-1/1">
          <AdminTable
            admins={admins}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
