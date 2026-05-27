import { ItemList } from "../ItemList/ItemList";

export function ItemListContainer({ Mensaje }) {
    const productos = [
        { id: '1234', nombre: 'Notebook Pro', precio: 120000, stock: 15, imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80"},
        { id: '2344', nombre: 'Monitor Curvo', precio: 4500000, stock: 25, imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80"},
        { id: '2545', nombre: 'Teclado Mecánico', precio: 150000, stock: 50, imagen: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&q=80"},
        { id: '2545', nombre: 'Funda Premiun', precio: 15000, stock: 50, imagen: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=500&q=80"},
        
    ];

    return (
        <div style={contenedorEstilo}>
            
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>{Mensaje}</h2>

            
            <div style={grillaCentradaEstilo}> 
                <ItemList productos={productos} />
            </div>
        </div>
    );
}

const contenedorEstilo = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    boxSizing: 'border-box'
};

const grillaCentradaEstilo = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center', /* Fuerza a que todo el contenido vaya al medio */
    width: '100%'
};
