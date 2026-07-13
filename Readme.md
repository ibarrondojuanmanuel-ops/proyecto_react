TecnoLibrería - E-commerce Insumos Tecnológicos


## Características del Proyecto

### 1. Autenticación y Rutas Protegidas
- **Rutas Públicas:** Navegación libre por el catálogo principal (`/`) y la vista detallada del carrito (`/carrito`).
- **Autenticación con Firebase:** Formulario de inicio de sesión seguro en `/login`.
- **Ruta Privada:** Panel de administración avanzado en `/admin` protegido mediante un componente Guard (`RutaProtegida`) que restringe el acceso a usuarios no autenticados.

### 2. Gestión de Productos y Cupones 
- **Persistencia en Firebase:** Conexión completa a Firestore Database para leer, crear, editar y eliminar productos en tiempo real con `onSnapshot`.
- **Buscador Reactivo y Paginación:** Filtrado instantáneo por nombre y paginación de elementos en el catálogo para optimizar el rendimiento.
- **Sistema de Cupones:** Validación lógica en el carrito de compras que permite aplicar el código de descuento `TALENTO10` para obtener una rebaja del 10% sobre el total bruto.

### 3. Diseño y Optimización 
- Estructura de maquetación limpia utilizando **Bootstrap** 
- Uso estricto de Flexbox (`display: flex` y `flex-wrap: wrap`) en el mapeo de listas (`ItemList.jsx`) para garantizar un diseño responsivo. 

## 4. Tecnologías Utilizadas
- **Frontend:** React, React Router DOM (v6), JavaScript, Bootstrap 5.
- **Backend :** Google Firebase (Firestore Database & Authentication).
- **Herramientas:** Vite, Node.js.

## Credenciales de Prueba 
Para ingresar al Panel de Gestión Protegido (`/login`), se puede utilizar la siguiente cuenta de demostración:
- **Usuario / Email:** profesor@test.com
- **Contraseña:** Profe123