import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import { Contador } from "./componentes/Contador/Contador"
import { ItemListContainer } from "./componentes/ItemListContainer/ItemListContainer"
import { Layout } from "./componentes/Layout"
import { NosotrosContainer } from './componentes/NosotrosContainer/NosotrosContainer';
import { PersonajesContainer } from './componentes/PersonajesContainer/PersonajesContainer';

import { ProductosNacionales } from './componentes/ProductosNacionales/ProductosNacionales';
import { Login } from './componentes/Login/Login';
import { Gestion } from './componentes/Gestion/Gestion';

import Carrito from './componentes/Carrito/Carrito';


function RutaProtegida({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="text-center my-5"><h3>Cargando...</h3></div>;
  
  
  if (!user || user.rol !== 'admin') return <Navigate to="/login" />;
  
  return children;
}

function App() {
  return (
    <Routes>
      {/* Tienda principal */}
      <Route path="/" element={
        <Layout>
          <main> 
            <h1 className="text-center my-4">Líder En Ventas De Insumos Tecnológicos</h1>
            <p className="text-center">Innovación y soluciones tecnológicas a tu alcance</p>
            
            <ProductosNacionales />
            
            <NosotrosContainer />
            <PersonajesContainer />
          </main>
        </Layout>
      } />
      
      {/* Carrito de compras */}
      <Route path="/carrito" element={
        <Layout>
          <main>
            <Carrito />
          </main>
        </Layout>
      } />
      
      {/* Formulario de Login */}
      <Route path="/login" element={<Login />} />
      
      {/* RUTA DE GESTIÓN */}
      <Route path="/alta" element={
        <RutaProtegida>
          <Layout>
            <main>
              <Gestion />
            </main>
          </Layout>
        </RutaProtegida>
      } />

      {/* RUTA DE CUPONES */}
     <Route path="/cupones" element={
        <RutaProtegida>
          <Layout>
            <main className="container my-5" style={{ maxWidth: '600px' }}>
              <div className="card shadow p-4">
                <h2 className="text-center mb-4">🎟️ Panel de Gestión de Cupones</h2>
                <p className="text-muted text-center">Crear nuevos descuentos para la TecnoLibrería</p>
                
                <form onSubmit={(e) => e.preventDefault()} className="mt-4">
                  <div className="mb-3">
                    <label className="form-label">Código del Cupón</label>
                    <input type="text" className="form-control" placeholder="Ej: DESCUENTO10" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Porcentaje de Descuento (%)</label>
                    <input type="number" className="form-control" placeholder="10" />
                  </div>
                  <button type="button" className="btn btn-primary w-100" onClick={() => alert('Cupón creado con éxito ')}>
                    Crear Cupón de Descuento
                  </button>
                </form>
              </div>
            </main>
          </Layout>
        </RutaProtegida>
      } />

      {/* Ruta alternativa */}
      <Route path="/admin" element={<Navigate to="/alta" />} />

      {/* Si no encuentra la ruta, vuelve al inicio */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;