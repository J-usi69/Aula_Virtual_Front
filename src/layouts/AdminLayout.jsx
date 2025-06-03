import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow w-full md:ml-64">
        <Navbar />
        <main className="flex-grow p-4 mt-15">
          <Outlet /> 
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
