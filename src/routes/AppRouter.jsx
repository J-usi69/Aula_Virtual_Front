import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

import AdminLayout from '../layouts/AdminLayout';
import ProfesorLayout from '../layouts/ProfesorLayout';

import AdminPage from "../pages/admin/admin";
import HorarioPage from "../pages/admin/horario";
import MateriaPage from '../pages/admin/materia';
import ProfesorPage from '../pages/admin/profesor';
import ApoderadoPage from '../pages/admin/apoderado';
import EstudiantePage from '../pages/admin/estudiante';
import GestionPage from '../pages/admin/gestion';
import BoletasPage from '../pages/admin/boleta';
import PagosMatriculaPage from '../pages/admin/matricula';

import Home from '../pages/profesor/home';
import ParticipacionPage from '../pages/profesor/Participacion';
import AsistenciaPage from '../pages/profesor/AsistenciaPage';
import NotasFinalesPage from '../pages/profesor/NotasPage';
/*
import AsistenciaPage from '../pages/profesor/AsistenciaPage';
import NotasPage from '../pages/profesor/NotasPage';
*/


export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Administrador */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminPage />} />
        <Route path="/admin/horario" element={<HorarioPage />} />
        <Route path="/admin/materia" element={<MateriaPage />} />
        <Route path="/admin/profesor" element={<ProfesorPage />} />
        <Route path="/admin/apoderado" element={<ApoderadoPage />} />
        <Route path="/admin/estudiantes" element={<EstudiantePage />} />
        <Route path="/admin/gestion" element={<GestionPage />} />
        <Route path="/admin/inscripcion" element={<BoletasPage />} />
        <Route path="/admin/matricula" element={<PagosMatriculaPage />} />
      </Route>

      {/* Profesor */}
      <Route path="/profesor" element={<ProfesorLayout />}>
        <Route index element={<Home />} />
        <Route path="participacion/:gcpId/:materiaId/:paraleloId" element={<ParticipacionPage />} />
        <Route path="asistencia/:gcpId/:materiaId/:paraleloId" element={<AsistenciaPage />} />
        <Route path="notas/:gcpId/:materiaId/:paraleloId" element={<NotasFinalesPage />} />
        
       
      </Route>

    </Routes>
  );
};
