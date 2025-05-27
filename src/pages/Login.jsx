import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { redirectByRole } from '../utils/redirectByRole';
import logo from '../assets/brain-logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginService({ email, password });
      const { user, token } = data;
      login(user, token);
      await redirectByRole(user, navigate);
    } catch (err) {
      console.error('Error de login:', err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-primary-gradient">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-2xl m-4">
        {/* Lado izquierdo */}
        <div className="md:w-1/2 w-full bg-form-gradient flex flex-col items-center justify-center p-8">
          <img src={logo} alt="Logo Aula Inteligente" className="h-28 mb-4" />
          <h1 className="text-xl md:text-2xl font-bold text-white text-center">AULA INTELIGENTE</h1>
        </div>

        {/* Lado derecho */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-6 text-center">Iniciar Sesión</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-ring-primary"
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-ring-primary"
              required
            />
            <button
              type="submit"
              className="btn-primary w-full py-2 rounded-lg font-semibold"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
