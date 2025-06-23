import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import PetList from './pages/PetList';
import AdminPets from './pages/AdminPets';
import MyPets from './pages/MyPets';
import CreatePet from './pages/CreatePet';
import PetDetail from './pages/PetDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pets" element={<PetList />} />
        <Route path="/admin/pets" element={<AdminPets />} />
        <Route path="/mypets" element={<MyPets />} />
        <Route path="/mypets/:id" element={<PetDetail />} />
        <Route path="/create-pet" element={<CreatePet />} />
      </Routes>

      {/* 🔔 Contenedor para las notificaciones */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
};

export default App;
