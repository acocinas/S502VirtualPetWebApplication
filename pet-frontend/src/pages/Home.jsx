import { Link } from 'react-router-dom';

function Home() {
  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  return (
    <div>
      <h1>Bienvenido, {username}</h1>

      {role === 'ROLE_USER' && (
        <div>
          <p>🐾 Esta es tu vista de usuario. Aquí puedes cuidar de tus mascotas.</p>
          <Link to="/mypets">📋 Ver mis mascotas</Link><br />
          <Link to="/create-pet">➕ Crear nueva mascota</Link>
        </div>
      )}

      {role === 'ROLE_ADMIN' && (
        <div>
          <p>🔧 Eres administrador. Elige qué quieres hacer:</p>
          <ul>
            <li><Link to="/mypets">👤 Ver mis mascotas</Link></li>
            <li><Link to="/admin/pets">🛠️ Ver todas las mascotas del sistema</Link></li>
            <li><Link to="/create-pet">➕ Crear nueva mascota</Link></li>
            <li>👥 Ver todos los usuarios (pendiente)</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;

