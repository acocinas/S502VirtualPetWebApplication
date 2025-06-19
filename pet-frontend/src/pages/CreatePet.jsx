import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPet } from '../services/petService';

function CreatePet() {
  const [name, setName] = useState('');
  const [developerType, setDeveloperType] = useState('FRONTEND');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    try {
      await createPet({ name, developerType });
      alert('Mascota creada correctamente');
      navigate('/mypets');
    } catch (err) {
      console.error(err);
      setError('Error al crear la mascota');
    }
  };

  return (
    <div>
      <h2>Crear Nueva Mascota</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre de la mascota:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Tipo de desarrollador:</label>
          <select
            value={developerType}
            onChange={(e) => setDeveloperType(e.target.value)}
          >
            <option value="FRONTEND">Frontend 🐰</option>
            <option value="BACKEND">Backend 🐥</option>
          </select>
        </div>

        <button type="submit">Crear Mascota</button>
      </form>
    </div>
  );
}

export default CreatePet;
