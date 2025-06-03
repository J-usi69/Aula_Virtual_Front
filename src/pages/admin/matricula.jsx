import { useState } from "react";
import PagoMatriculaForm from "../../components/admin/PagoMatriculaForm";
import PagoMatriculaList from "../../components/admin/PagoMatriculaList";

export default function PagosMatriculaPage() {
  const [refresh, setRefresh] = useState(false);

  const actualizarLista = () => setRefresh(!refresh);

  return (
    <div className="container mx-auto p-4">
      <PagoMatriculaForm onMatriculaRegistrada={actualizarLista} />
      <PagoMatriculaList refreshTrigger={refresh} />
    </div>
  );
}
