import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPet } from '../services/petService';
import createPetBg from '../assets/CreatePet.png'; // asegúrate de que la ruta es correcta

const CreatePet: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [developerType, setDeveloperType] = useState<'FRONTEND' | 'BACKEND'>('FRONTEND');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    try {
      await createPet({
        name,
        developerType,
        habitatType: 'REST_ZONE',       // se puede personalizar más adelante
        accessoryType: 'NO_ACCESSORY',
      });
      alert('Mascota creada correctamente');
      navigate('/mypets');
    } catch (err) {
      console.error(err);
      setError('Error al crear la mascota');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${createPetBg})`,
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
          backgroundColor: 'rgba(255, 255, 255, 0)',
          borderRadius: '1rem',
          padding: '2rem',
          position: 'absolute',
          top: '75%',
          left: '35%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 15px rgba(0,0,0,0.3)',
          zIndex: 10,
          width: '320px',
          height: '250px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <h3 style={{ textAlign: 'center', margin: 0 }}>Crear Nueva Mascota</h3>
        {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input
            type="text"
            placeholder="Nombre de la mascota"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
            }}
            required
          />
          <select
            value={developerType}
            onChange={(e) => setDeveloperType(e.target.value as 'FRONTEND' | 'BACKEND')}
            style={{
              padding: '0.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #ccc',
            }}
            required
          >
            <option value="FRONTEND">Frontend 🐰</option>
            <option value="BACKEND">Backend 🐥</option>
          </select>
          <button
            type="submit"
            style={{
              padding: '0.5rem 1rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              backgroundColor: '#fff',
              color: '#000',
            }}
          >
            Crear
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePet;
