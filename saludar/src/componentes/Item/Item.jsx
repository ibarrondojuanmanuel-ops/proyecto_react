import { useState } from 'react';
import { useCarrito } from '../../context/CarritoContext'; 

export function Item({ id, nombre, precio, stock, imagen, descripcion, categoria }) { // 2. Sumamos 'id', 'descripcion' y 'categoria'
    
    const { agregarAlCarrito } = useCarrito(); // 3. TRAEMOS LA FUNCIÓN GLOBAL
    const [esFavorito, setEsFavorito] = useState(false);

    const marcarComoFavorito = () => {
        setEsFavorito(!esFavorito);
    };

    const CompraClick = () => {
       
        const productoAAgregar = { id, nombre, precio, stock, imagen, descripcion, categoria };
        agregarAlCarrito(productoAAgregar);
        alert(`¡Agregaste ${nombre} al chango!`);
    };

    return (
        <div style={cardEstilo}>
            <img 
                src={imagen} 
                alt={nombre} 
                style={imagenEstilo} 
            />

            <h3>{nombre}</h3>
            <p>Precio: ${precio}</p>
            <p>Stock disponible: {stock}</p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px', justifyContent: 'center' }}>
                {/* 5. EL BOTÓN AHORA AGREGA DE VERDAD */}
                <button onClick={CompraClick} style={{ cursor: 'pointer' }}>Comprar</button>

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
    width: '240px', 
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    textAlign: 'center', 
    backgroundColor: '#fff'
};

const imagenEstilo = {
    width: '100%',
    height: '150px',
    objectFit: 'contain', 
    borderRadius: '6px',
    backgroundColor: '#f9f9f9',
    marginBottom: '10px'
};