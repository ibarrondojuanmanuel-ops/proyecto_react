import { useState } from 'react';

export function Item({ nombre, precio, stock, }) {
    
    const [esFavorito, setEsFavorito] = useState(false);

    
    const marcarComoFavorito = () => {
        setEsFavorito(!esFavorito);
    };

    const CompraClick = () => {
        alert(`¡Agregaste ${nombre} al chango!`);
    };

    return (
        <div style={cardEstilo}>
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


const cardEstilo = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
    margin: '10px',
    maxWidth: '250px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
};

