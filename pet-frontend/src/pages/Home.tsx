import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import personalPet from '../assets/wallpapers/personalPet.png';

const Home: React.FC = () => {
  const username = localStorage.getItem('username') || 'Usuario';
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div
      style={{
        backgroundImage: `url(${personalPet})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: '1rem',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          backgroundColor: '#6ec1e4',
          borderRadius: '1rem',
          padding: '2rem',
          position: 'absolute',
          top: '50%',
          left: '49%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: '0 0 15px rgba(0,0,0,0.3)',
          zIndex: 10,
          width: '280px',
          height: role === 'ROLE_ADMIN' ? '250px' : '210px', // Ajustamos altura para incluir el botón logout
        }}
      >
        <h2 style={{ margin: 0 }}>Hola, {username} 👋</h2>

        {role === 'ROLE_USER' && (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/mypets">
              <button
                style={{
                  padding: '0.5rem 1rem',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                Ver Mis Mascotas
              </button>
            </Link>
            <Link to="/create-pet">
              <button
                style={{
                  padding: '0.5rem 1rem',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                Crear Mascota
              </button>
            </Link>
          </div>
        )}

        {role === 'ROLE_ADMIN' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link to="/mypets">
              <button
                style={{
                  padding: '0.5rem 1rem',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Ver Mis Mascotas
              </button>
            </Link>
            <Link to="/admin/pets">
              <button
                style={{
                  padding: '0.5rem 1rem',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Ver Todas las Mascotas
              </button>
            </Link>
            <Link to="/create-pet">
              <button
                style={{
                  padding: '0.5rem 1rem',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                Crear Mascota
              </button>
            </Link>
          </div>
        )}

        {/* 🔒 Botón Cerrar Sesión */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: '1rem',
            backgroundColor: '#444',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          🔒 Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Home;
