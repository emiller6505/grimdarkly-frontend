import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Units from './pages/Units';
import Weapons from './pages/Weapons';
import Factions from './pages/Factions';
import UnitDetail from './pages/UnitDetail';
import WeaponDetail from './pages/WeaponDetail';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/units" element={<Units />} />
        <Route path="/units/:id" element={<UnitDetail />} />
        <Route path="/weapons" element={<Weapons />} />
        <Route path="/weapons/:id" element={<WeaponDetail />} />
        <Route path="/factions" element={<Factions />} />
      </Routes>
    </Layout>
  );
}

export default App;
