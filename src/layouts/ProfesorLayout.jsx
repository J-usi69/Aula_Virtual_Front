import { Outlet } from 'react-router-dom';
import ProfesorNavbar from "../components/ProfesorNavbar";
import Footer from '../components/Footer';

const ProfesorLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfesorNavbar />
      <header className="bg-blue-600 text-white p-4">Panel del Profesor</header>
      <main className="p-4">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default ProfesorLayout;
