import React, { useState } from 'react';
import { useCarrito } from '../../context/CarritoContext';

export default function Carrito() {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();
  const [codigoCupon, setCodigoCupon] = useState('');
  const [descuento, setDescuento] = useState(0); // Porcentaje de descuento (ej: 10 para 10%)
  const [mensajeCupon, setMensajeCupon] = useState('');

  // Calcular el total bruto de la compra
  const totalBruto = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  // Aplicar cupón 
  const manejarAplicarCupon = (e) => {
    e.preventDefault();
    // Validamos un cupón de prueba simple (ej: TALENTO10 para 10% de descuento)
    if (codigoCupon.toUpperCase() === 'TALENTO10') {
      setDescuento(10);
      setMensajeCupon('✅ ¡Cupón de 10% de descuento aplicado con éxito!');
    } else if (codigoCupon.trim() === '') {
      setMensajeCupon('Por favor, ingresá un código.');
    } else {
      setDescuento(0);
      setMensajeCupon('❌ Código de cupón inválido.');
    }
  };

  // Calcular el total final aplicando el descuento 
  const montoDescuento = (totalBruto * descuento) / 100;
  const totalFinal = totalBruto - montoDescuento;

  if (carrito.length === 0) {
    return (
      <div className="container my-5 text-center p-5 bg-light rounded shadow-sm">
        <h2>Tu carrito está vacío 🛒</h2>
        <p className="text-muted">¡Date una vuelta por el catálogo para sumar insumos tecnológicos!</p>
      </div>
    );
  }

  return (
    <div className="container my-5 p-4 bg-white rounded shadow-sm">
      <h2 className="mb-4 text-center border-bottom pb-3">Carrito de Compras</h2>
      
      {/* Listado de Productos */}
      <div className="table-responsive mb-4">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th className="text-center">Cantidad</th>
              <th className="text-end">Precio Unitario</th>
              <th className="text-end">Subtotal</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                    {item.imagen && (
                      <img src={item.imagen} alt={item.nombre} style={{ width: '40px', height: '40px', objectFit: 'contain', marginRight: '10px' }} />
                    )}
                    <span className="fw-bold">{item.nombre}</span>
                  </div>
                </td>
                <td className="text-center">{item.cantidad}</td>
                <td className="text-end">${item.precio}</td>
                <td className="text-end">${item.precio * item.cantidad}</td>
                <td className="text-center">
                  <button 
                    onClick={() => eliminarDelCarrito(item.id)} 
                    className="btn btn-sm btn-outline-danger"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row g-4 justify-content-between border-top pt-4">
        {/* Formulario de Cupones de Descuento */}
        <div className="col-md-5">
          <div className="p-3 bg-light rounded border">
            <h5 className="mb-3">¿Tenés un cupón de descuento?</h5>
            <form onSubmit={manejarAplicarCupon} className="d-flex gap-2">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Ej: TALENTO10"
                value={codigoCupon}
                onChange={(e) => setCodigoCupon(e.target.value)}
              />
              <button type="submit" className="btn btn-primary px-4">Aplicar</button>
            </form>
            {mensajeCupon && (
              <p className="small mt-2 mb-0 fw-bold">{mensajeCupon}</p>
            )}
          </div>
        </div>

        {/* Resumen de Costos y Totales */}
        <div className="col-md-5 text-end">
          <div className="p-3 bg-light rounded border">
            <p className="mb-2">Subtotal: <strong>${totalBruto}</strong></p>
            {descuento > 0 && (
              <p className="mb-2 text-success">Descuento ({descuento}%): <strong>-${montoDescuento}</strong></p>
            )}
            <hr />
            <h3 className="text-dark">Total a pagar: ${totalFinal}</h3>
            
            <div className="d-flex gap-2 justify-content-end mt-4">
              <button 
                onClick={vaciarCarrito} 
                className="btn btn-outline-secondary"
              >
                Vaciar Carrito
              </button>
              <button 
                onClick={() => alert('¡Gracias por tu compra!')} 
                className="btn btn-success px-4"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}