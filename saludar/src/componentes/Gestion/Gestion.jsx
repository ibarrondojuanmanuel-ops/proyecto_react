import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

export function Gestion() {
  const { logout } = useAuth();
  
  
  const [productos, setProductos] = useState([]);
  
  
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState('');

  
  useEffect(() => {
    const jsonRef = collection(db, 'productos');
    const unsubscribe = onSnapshot(jsonRef, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductos(docs);
    });
    return () => unsubscribe();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    
    if (!nombre.trim() || !precio || !categoria.trim() || !descripcion.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (parseFloat(precio) <= 0) {
      setError('El precio debe ser un número mayor a 0.');
      return;
    }

    const productoData = {
      nombre: nombre.trim(),
      precio: parseFloat(precio),
      categoria: categoria.trim(),
      descripcion: descripcion.trim()
    };

    try {
      if (editandoId) {
        
        const productoDoc = doc(db, 'productos', editandoId);
        await updateDoc(productoDoc, productoData);
        setEditandoId(null); // Salimos del modo edición
      } else {
        
        await addDoc(collection(db, 'productos'), productoData);
      }
      
      
      setNombre('');
      setPrecio('');
      setCategoria('');
      setDescripcion('');
    } catch (err) {
      console.error(err);
      setError('Hubo un error al guardar en la base de datos.');
    }
  };

  
  const activarEdicion = (prod) => {
    setEditandoId(prod.id);
    setNombre(prod.nombre);
    setPrecio(prod.precio);
    setCategoria(prod.categoria);
    setDescripcion(prod.descripcion);
  };

  
  const cancelarEdicion = () => {
    setEditandoId(null);
    setNombre('');
    setPrecio('');
    setCategoria('');
    setDescripcion('');
  };

  
  const eliminarProducto = async (id) => {
    if (window.confirm('¿Seguro que querés eliminar este producto?')) {
      try {
        await deleteDoc(doc(db, 'productos', id));
      } catch (err) {
        console.error(err);
        alert('No se pudo eliminar el producto.');
      }
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Panel de Gestión de Productos</h1>
        <button onClick={logout} className="btn btn-danger">Cerrar Sesión</button>
      </div>

      <div className="row">
        {/* Formulario de Alta / Modificación */}
        <div className="col-md-4 mb-4">
          <div className="card shadow p-3">
            <h3>{editandoId ? 'Editar Producto' : 'Nuevo Producto'}</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="form-label">Nombre</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)} 
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Precio</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={precio} 
                  onChange={(e) => setPrecio(e.target.value)} 
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Categoría</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={categoria} 
                  onChange={(e) => setCategoria(e.target.value)} 
                  placeholder="Ej: Nacional, Importado"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea 
                  className="form-control" 
                  rows="3" 
                  value={descripcion} 
                  onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-success w-100">
                {editandoId ? 'Guardar Cambios' : 'Agregar Producto'}
              </button>
              
              {editandoId && (
                <button type="button" onClick={cancelarEdicion} className="btn btn-secondary w-100 mt-2">
                  Cancelar Edición
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Tabla con el listado de productos */}
        <div className="col-md-8">
          <div className="card shadow p-3">
            <h3>Listado Stock ({productos.length})</h3>
            <div className="table-responsive">
              <table className="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map(prod => (
                    <tr key={prod.id}>
                      <td>{prod.nombre}</td>
                      <td><span className="badge bg-secondary">{prod.categoria}</span></td>
                      <td>${prod.precio}</td>
                      <td>
                        <button 
                          onClick={() => activarEdicion(prod)} 
                          className="btn btn-sm btn-warning me-2"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => eliminarProducto(prod.id)} 
                          className="btn btn-sm btn-danger"
                        >
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                  {productos.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center text-muted">No hay productos cargados en la base de datos.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}