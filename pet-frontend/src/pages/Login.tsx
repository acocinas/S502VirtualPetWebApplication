import { useState, FormEvent } from 'react';
import { login, register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import virtualPetBackground from '../assets/virtualPet.png';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
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

  const handleRegister = async (e: FormEvent) => {
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
    <div
      style={{
        backgroundImage: `url(${virtualPetBackground})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center top',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        overflow: 'auto',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: '12px',
          padding: '2rem',
          width: '90%',
          maxWidth: '400px',
          marginTop: '30vh', // 👈 Ajusta esto según la altura de tu mochila
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'black' }}>
          {isLogin ? 'Inicio de Sesión' : 'Registrarse'}
        </h1>

        <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              marginRight: '1rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
            }}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              padding: '0.5rem 1rem',
              cursor: 'pointer',
            }}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="username" style={{ color: 'black' }}>Usuario:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '1rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginTop: '0.25rem',
              }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="password" style={{ color: 'black' }}>Contraseña:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '1rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginTop: '0.25rem',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#007bff',
              color: 'white',
              fontSize: '1.1rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            {isLogin ? 'Entrar' : 'Crear cuenta'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
