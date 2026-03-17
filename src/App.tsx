import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { IdentifyPage } from './pages/IdentifyPage';
import { CatalogPage } from './pages/CatalogPage';
import { EncyclopediaPage } from './pages/EncyclopediaPage';
import { SpecimenDetailPage } from './pages/SpecimenDetailPage';
import { SpeciesDetailPage } from './pages/SpeciesDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="identify" element={<IdentifyPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:id" element={<SpecimenDetailPage />} />
          <Route path="encyclopedia" element={<EncyclopediaPage />} />
          <Route path="encyclopedia/:id" element={<SpeciesDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
