import { ItemList } from "../ItemList/ItemList";

export function ItemListContainer({ Mensaje }) {
    const productos = [
        { id: '1234', nombre: 'Notebook Pro', precio: 120000, stock: 15, imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80"},
        { id: '2344', nombre: 'Monitor Curvo', precio: 4500000, stock: 25, imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80"},
        { id: '2545', nombre: 'Teclado Mecánico', precio: 150000, stock: 50, imagen: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&q=80"},
        {id: '2545', nombre: 'Funda Premiun', precio: 15000, stock: 50, imagen: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&q=80"},
        {id: '2545', nombre: 'Pads Extendidos', precio: 45000, stock: 50, imagen: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&q=80"},
    ];

    return (
        <div>
            <h2>{Mensaje}</h2>

            <div> <ItemList productos={productos} />

            </div>

        </div>

    );
}

