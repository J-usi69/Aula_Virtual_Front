import { useState } from "react";
import BoletaForm from "../../components/admin/BoletaForm";
import BoletaList from "../../components/admin/BoletaList";

export default function BoletasPage() {
  const [reload, setReload] = useState(false);
  const [boletaToEdit, setBoletaToEdit] = useState(null);

  const handleBoletaRegistrada = () => {
    setReload(!reload);
    setBoletaToEdit(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
        Gestión de Boletas de Inscripción
      </h1>
      <BoletaForm
        onBoletaRegistrada={handleBoletaRegistrada}
        boletaToEdit={boletaToEdit}
        cancelEdit={() => setBoletaToEdit(null)}
      />
      <BoletaList reloadTrigger={reload} onEdit={setBoletaToEdit} />
    </div>
  );
}
