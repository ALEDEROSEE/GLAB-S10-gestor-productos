# Gestion de productos - Tarea del laboratorio 10

Desarrollo de Aplicaciones Empresariales - Tecsup, ciclo 2026-2.
Alumno: Alvarez Sayaverde Alejandro Aaron. Docente: Jean Marco Miranda Llanos.

Prototipo de interfaz para consultar y registrar productos, hecho con React 19 y
componentes funcionales con Hooks, Vite, Tailwind CSS 4 y shadcn/ui. Los datos
viven solo en el estado de React: al recargar la pagina se vuelve al catalogo
inicial de cinco productos.

## Estructura

- `src/data/productosIniciales.js`: catalogo de ejemplo y lista de categorias.
- `src/components/FormularioProducto.jsx`: formulario con validacion
  (descripcion de 3 caracteres a mas, precio mayor que cero, categoria obligatoria)
  y los botones *Registrar producto* y *Limpiar*.
- `src/components/ListaProductos.jsx`: tabla de shadcn/ui con los registros.
- `src/App.jsx`: guarda el estado, genera el codigo unico y muestra el mensaje de
  confirmacion.

## Como ejecutarlo

```
npm install
npm run dev
```
