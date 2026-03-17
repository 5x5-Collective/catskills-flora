import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Encyclopedia from './pages/Encyclopedia';
import MyCatalog from './pages/MyCatalog';
import Identify from './pages/Identify';
import Ideas from './pages/Ideas';
import PlantDetail from './pages/PlantDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Encyclopedia />} />
          <Route path="catalog" element={<MyCatalog />} />
          <Route path="identify" element={<Identify />} />
          <Route path="ideas" element={<Ideas />} />
          <Route path="plant/:id" element={<PlantDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
