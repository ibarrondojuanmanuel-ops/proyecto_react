export function Item({ nombre, precio, stock }) {
    const CompraClick = () => {

        alert(`¡Agregaste ${nombre} al chango!`);
    };
    return (

        <div>

            <h3>{nombre} </h3>
            <p>Precio: ${precio}</p>
            <p>Stock disponible: {stock}</p>
            <button onClick={CompraClick}>Comprar</button>

        </div>

    );

}