import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

import AdminPage from "../pages/admin/admin";
import HorarioPage from "../pages/admin/horario";
import MateriaPage from '../pages/admin/materia';
import ProfesorPage from '../pages/admin/profesor';
import ApoderadoPage from '../pages/admin/apoderado';
import EstudiantePage from '../pages/admin/estudiante';
import GestionPage from '../pages/admin/gestion';


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Administrador */}
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/horario" element={<HorarioPage />} />
      <Route path="/admin/materia" element={<MateriaPage />} />
      <Route path="/admin/profesor" element={<ProfesorPage />} />
      <Route path="/admin/apoderado" element={<ApoderadoPage />} />
      <Route path="/admin/estudiantes" element={<EstudiantePage />} />
      <Route path="/admin/gestion" element={<GestionPage />} />

      
      {/* Profesor */}

    </Routes>
  );
};
