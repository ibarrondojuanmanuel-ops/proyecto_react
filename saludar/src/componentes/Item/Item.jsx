import { useState } from 'react';

// 1. Agregamos "imagen" dentro de las llaves de las props para recibir el link
export function Item({ nombre, precio, stock, imagen }) {
    
    const [esFavorito, setEsFavorito] = useState(false);

    const marcarComoFavorito = () => {
        setEsFavorito(!esFavorito);
    };

    const CompraClick = () => {
        alert(`¡Agregaste ${nombre} al chango!`);
    };

    return (
        <div style={cardEstilo}>
            {/* 2. CLAVAMOS LA ETIQUETA IMG ACÁ ARRIBA */}
            {/* Si viene el link en la prop, la muestra de una */}
            <img 
                src={imagen} 
                alt={nombre} 
                style={imagenEstilo} 
            />

            <h3>{nombre}</h3>
            <p>Precio: ${precio}</p>
            <p>Stock disponible: {stock}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
                <button onClick={CompraClick}>Comprar</button>

                <span 
                    onClick={marcarComoFavorito} 
                    style={{ 
                        fontSize: '24px', 
                        cursor: 'pointer', 
                        userSelect: 'none',
                        color: esFavorito ? '#FFD700' : '#CCCCCC' 
                    }}
                >
                    {esFavorito ? '★' : '☆'}
                </span>
            </div>
        </div>
    );
}

// === ESTILOS EN LÍNEA ===

const cardEstilo = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    margin: '10px',
    width: '240px', /* Cambié maxWidth por width fijo para que todas las tarjetas midan igual */
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'center', /* Centra los textos adentro de la tarjeta */
    backgroundColor: '#fff'
};

// 3. AGREGAMOS ESTE OBJETO DE ESTILO PARA LA IMAGEN
const imagenEstilo = {
    width: '100%',
    height: '150px',
    objectFit: 'contain', /* Hace que las fotos se adapten sin deformarse */
    borderRadius: '6px',
    backgroundColor: '#f9f9f9',
    marginBottom: '10px'
};