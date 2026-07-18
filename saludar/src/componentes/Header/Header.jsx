import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext'; 
import { useAuth } from '../../context/AuthContext'; // Importamos el contexto de autenticación

function Header() {
    const { carrito } = useCarrito();
    const { user, logout } = useAuth(); // Obtenemos el usuario conectado y la función para cerrar sesión

    const cantidadItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    return (
        <header style={headerEstilo}>
            <div style={contenedorEstilo}>
                {/* Título que vuelve al inicio al hacer clic */}
                <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                    <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold' }}>TecnoLibrería</h1>
                </Link>

                {/* Menú de Navegación y Control de Usuarios */}
                <div style={menuUsuarioEstilo}>
                    {/* Si el usuario inició sesión, evaluamos si es Administrador */}
                    {user ? (
                        <>
                            {user.rol === 'admin' && ( // Si su rol es admin, le mostramos la gestión
                                <>
                                    <Link to="/alta" style={linkEstilo}>⚙️ Gestión de Productos</Link>
                                    <Link to="/cupones" style={linkEstilo}>🎟️ Cupones</Link>
                                </>
                            )}
                            <span style={bienvenidaEstilo}>👋 ¡Hola, {user.email}!</span>
                            <button onClick={logout} style={botonLogoutEstilo}>
                                Salir
                            </button>
                        </>
                    ) : (
                        // Si NO está logueado, le mostramos el botón para Iniciar Sesión
                        <Link to="/login" style={botonLoginEstilo}>
                            🔑 Iniciar Sesión
                        </Link>
                    )}

                    {/* Botón para ir al carrito */}
                    <Link to="/carrito" className="btn btn-light d-flex align-items-center gap-2 shadow-sm" style={botonCarritoEstilo}>
                        <span>🛒 Mi Changuito</span>
                        {cantidadItems > 0 && (
                            <span className="badge bg-danger rounded-pill">
                                {cantidadItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}

// --- ESTILOS ---
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

const menuUsuarioEstilo = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap'
};

const linkEstilo = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    borderBottom: '2px solid transparent',
    paddingBottom: '2px',
    transition: 'border-bottom 0.3s'
};

const bienvenidaEstilo = {
    fontWeight: '500',
    fontSize: '0.95rem',
    color: '#333'
};

const botonLoginEstilo = {
    backgroundColor: '#fff',
    color: '#333',
    padding: '8px 16px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const botonLogoutEstilo = {
    backgroundColor: '#ff6b6b',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '0.85rem'
};

const botonCarritoEstilo = {
    fontWeight: 'bold',
    color: '#333',
    borderRadius: '20px',
    padding: '8px 16px'
};

export default Header;