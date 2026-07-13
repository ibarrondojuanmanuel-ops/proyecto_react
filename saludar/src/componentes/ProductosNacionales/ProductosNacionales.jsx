import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { ItemList } from '../ItemList/ItemList'; // Importamos tu ItemList real

export function ProductosNacionales() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  
  
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 4;

  
  useEffect(() => {
    const productosRef = collection(db, 'productos');
    const unsubscribe = onSnapshot(productosRef, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductos(docs);
    });
    return () => unsubscribe();
  }, []);

  
  const productosFiltrados = productos.filter(prod =>
    prod.nombre?.toLowerCase().includes(busqueda.toLowerCase())
  );

  
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda]);

  
  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const productosPaginados = productosFiltrados.slice(indicePrimerElemento, indiceUltimoElemento);

  
  const totalPaginas = Math.ceil(productosFiltrados.length / elementosPorPagina);

  return (
    <div className="container my-5" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
      <h1 className="text-center mb-4" style={{ textAlign: 'center' }}>Catálogo de Productos</h1>

      {/* Barra de Búsqueda Reactiva */}
      <div className="mb-4" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          style={{ width: '100%', maxWidth: '500px', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' }}
          placeholder="🔍 Buscar producto por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Renderizar ItemList con los productos de la página actual */}
      <div style={{ display: 'flex', justifyContent: 'center', minHeight: '300px' }}>
        {productosFiltrados.length > 0 ? (
          <ItemList productos={productosPaginados} />
        ) : (
          <div style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
            <h5>No se encontraron productos que coincidan con la búsqueda.</h5>
          </div>
        )}
      </div>

      {/* Controles de Paginación (Botones) */}
      {totalPaginas > 1 && (
        <nav style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', gap: '10px', alignItems: 'center' }}>
          <button 
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual(prev => prev - 1)}
            style={{ padding: '8px 16px', cursor: paginaActual === 1 ? 'not-allowed' : 'pointer' }}
          >
            Anterior
          </button>
          
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
            Página {paginaActual} de {totalPaginas}
          </span>

          <button 
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual(prev => prev + 1)}
            style={{ padding: '8px 16px', cursor: paginaActual === totalPaginas ? 'not-allowed' : 'pointer' }}
          >
            Siguiente
          </button>
        </nav>
      )}
    </div>
  );
}