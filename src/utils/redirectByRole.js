import { getRoles } from '../services/roleService';

export const redirectByRole = async (user, navigate) => {
  try {
    const roles = await getRoles();
    const rol = roles.find(r => r.id === user.rol.id
    );

    if (!rol) {
      console.warn('Rol no reconocido:', user.rol_id);
      return navigate('/');
    }

    switch (rol.nombre) {
      case 'Administrador':
        navigate('/admin');
        break;
      case 'Profesor':
        navigate('/profesor');
        break;
      default:
        navigate('/');
    }
  } catch (err) {
    console.error('Error al redirigir por rol:', err.message);
    navigate('/');
  }
};
