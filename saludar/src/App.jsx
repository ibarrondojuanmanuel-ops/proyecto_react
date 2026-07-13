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
  if (!user) return <Navigate to="/login" />;
  return children;
}

function App() {
  return (
    <Routes>
      {/* tienda actual  */}
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
      
      {/* Carrito de compras  */}
      <Route path="/carrito" element={
        <Layout>
          <main>
            <Carrito />
          </main>
        </Layout>
      } />
      
      {/* Formulario de Login */}
      <Route path="/login" element={<Login />} />
      
      {/* panel de control */}
      <Route path="/admin" element={
        <RutaProtegida>
          <Gestion />
        </RutaProtegida>
      } />

      {/* De dar error, vuelve al inicio */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;