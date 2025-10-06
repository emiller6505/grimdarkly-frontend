import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import Units from './pages/Units';
import Weapons from './pages/Weapons';
import Factions from './pages/Factions';
import UnitDetail from './pages/UnitDetail';
import WeaponDetail from './pages/WeaponDetail';

function App() {
  return (
    <Layout>
      <PageTransition animationType="glow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/units" element={<Units />} />
          <Route path="/units/:id" element={<UnitDetail />} />
          <Route path="/weapons" element={<Weapons />} />
          <Route path="/weapons/:id" element={<WeaponDetail />} />
          <Route path="/factions" element={<Factions />} />
        </Routes>
      </PageTransition>
    </Layout>
  );
}

export default App;
