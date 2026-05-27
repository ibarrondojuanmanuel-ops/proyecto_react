import { Contador } from "./componentes/Contador/Contador"
import { ItemListContainer } from "./componentes/ItemListContainer/ItemListContainer"
import { Layout } from "./componentes/Layout"
import { NosotrosContainer } from './componentes/NosotrosContainer/NosotrosContainer';
import { PersonajesContainer } from './componentes/PersonajesContainer/PersonajesContainer';

function App() {


  return (
    <>
      <Layout>
        <head>


        </head>
        <main> 
          <h1>¡Bienvenidos a mi página!</h1>
          <Contador />
          <p>Este es el contenido principal.</p>
          <ItemListContainer Mensaje= "Nuestros Productos" />
          <NosotrosContainer />
          <PersonajesContainer />
        </main>
       
        <footer>


        </footer>
      </Layout>
    </>
  )
}

export default App
