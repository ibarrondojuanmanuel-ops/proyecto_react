import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext'; 

function Header() {
    const { carrito } = useCarrito();

    
    const cantidadItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    return (
        <header style={headerEstilo}>
            <div style={contenedorEstilo}>
                {/* Título que vuelve al inicio al hacer clic */}
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>TecnoLibrería</h1>
                </Link>

                {/* Botón flotante para ir al carrito con contador real */}
                <Link to="/carrito" className="btn btn-light d-flex align-items-center gap-2 shadow-sm" style={botonCarritoEstilo}>
                    <span>🛒 Mi Changuito</span>
                    {cantidadItems > 0 && (
                        <span className="badge bg-danger rounded-pill">
                            {cantidadItems}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
}


const headerEstilo = {
    backgroundColor: "#8DE2D6",
    padding: "15px 20px",
    color: "white"
};

const contenedorEstilo = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    flexWrap: 'wrap',
    gap: '10px'
};

const botonCarritoEstilo = {
    fontWeight: 'bold',
    color: '#333',
    borderRadius: '20px',
    padding: '8px 16px'
};

export default Header;