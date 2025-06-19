import { useState } from 'react';
import { login, register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) return alert('Rellena todos los campos');

    try {
      const response = await login(username, password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.user.username);
      localStorage.setItem('role', response.user.role);
      alert('¡Login correcto!');
      navigate('/home');
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password) return alert('Rellena todos los campos');

    try {
      await register(username, password);
      alert('Usuario registrado. Ahora puedes iniciar sesión.');
      setIsLogin(true);
    } catch (error) {
      alert('Error al registrar usuario');
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setIsLogin(true)}>Iniciar Sesión</button>
        <button onClick={() => setIsLogin(false)}>Registrarse</button>
      </div>

      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        <div>
          <label htmlFor="username">Usuario:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{isLogin ? 'Entrar' : 'Crear cuenta'}</button>
      </form>
    </div>
  );
}

export default Login;
