import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import PetList from './pages/PetList';
import AdminPets from './pages/AdminPets';
import MyPets from './pages/MyPets';
import CreatePet from './pages/CreatePet';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pets" element={<PetList />} />
        <Route path="/admin/pets" element={<AdminPets />} />
        <Route path="/mypets" element={<MyPets />} />
        <Route path="/create-pet" element={<CreatePet />} />
      </Routes>
    </Router>
  );
}

export default App;
