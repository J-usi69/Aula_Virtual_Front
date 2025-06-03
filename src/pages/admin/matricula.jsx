import { useState } from "react";
import PagoMatriculaForm from "../../components/admin/PagoMatriculaForm";
import PagoMatriculaList from "../../components/admin/PagoMatriculaList";

export default function PagosMatriculaPage() {
  const [refresh, setRefresh] = useState(false);

  const actualizarLista = () => setRefresh(!refresh);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
        Gestión de Pagos de Matrícula
      </h1>
      <PagoMatriculaForm onMatriculaRegistrada={actualizarLista} />
      <PagoMatriculaList refreshTrigger={refresh} />
    </div>
  );
}
