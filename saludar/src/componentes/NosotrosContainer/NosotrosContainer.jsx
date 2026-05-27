import { useState, useEffect } from 'react';

export function NosotrosContainer() {
    
    const [equipo, setEquipo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        
        fetch('/nosotros.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar el archivo del equipo');
                }
                return response.json();
            })
            .then((data) => {
                setEquipo(data); 
                setLoading(false); 
            })
            .catch((err) => {
                setError(err.message); 
                setLoading(false); 
            });
    }, []);

    
    if (loading) {
        return <h2 style={{ textAlign: 'center', margin: '20px' }}>Cargando equipo...</h2>;
    }

    if (error) {
        return <h2 style={{ textAlign: 'center', color: 'red', margin: '20px' }}>Error: {error}</h2>;
    }

  
    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Nuestro Equipo</h2>
            
            <div style={grillaEstilo}>
                {equipo.map((integrante) => (
                    <div key={integrante.id} style={tarjetaEstilo}>
                        <img 
                            src={integrante.foto} 
                            alt={integrante.nombre} 
                            style={{ borderRadius: '50%', width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                        <h4 style={{ margin: '10px 0 5px 0' }}>{integrante.nombre}</h4>
                        <p style={{ fontWeight: 'bold', color: '#555', margin: '0' }}>{integrante.puesto}</p>
                        <p style={{ fontSize: '14px', color: '#888' }}>{integrante.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


const grillaEstilo = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    justifyItems: 'center'
};

const tarjetaEstilo = {
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '240px'
};