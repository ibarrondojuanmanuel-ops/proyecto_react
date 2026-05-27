import { useState, useEffect } from 'react';

export function PersonajesContainer() {
    // Los mismos tres estados obligatorios para controlar la API
    const [personajes, setPersonajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
       
        fetch('https://rickandmortyapi.com/api/character')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al conectar con la API de Rick and Morty');
                }
                return response.json();
            })
            .then((data) => {
               
                setPersonajes(data.results); 
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <h2 style={{ textAlign: 'center', margin: '20px' }}>Cargando personajes desde la API...</h2>;
    }

    if (error) {
        return <h2 style={{ textAlign: 'center', color: 'red', margin: '20px' }}>Error: {error}</h2>;
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '40px auto', borderTop: '2px dashed #ccc' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px', marginTop: '20px' }}>
                
            </h2>
            
            <div style={grillaEstilo}>
                {personajes.slice(0, 8).map((personaje) => ( 
                    <div key={personaje.id} style={tarjetaEstilo}>
                        <img 
                            src={personaje.image} 
                            alt={personaje.name} 
                            style={{ borderRadius: '10px', width: '100%', height: 'auto' }}
                        />
                        <h4 style={{ margin: '10px 0 5px 0', color: '#333' }}>{personaje.name}</h4>
                        <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                            <strong>Estado:</strong> {personaje.status === 'Alive' ? '🟢 Vivo' : '🔴 Muerto/Desconocido'}
                        </p>
                        <p style={{ fontSize: '14px', color: '#888', margin: '5px 0 0 0' }}>
                            <strong>Especie:</strong> {personaje.species}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}


const grillaEstilo = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    justifyItems: 'center'
};

const tarjetaEstilo = {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '240px'
};