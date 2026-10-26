import { useState } from 'react'

import FormularioProducto from '@/components/FormularioProducto'
import ListaProductos from '@/components/ListaProductos'
import { PRODUCTOS_INICIALES } from '@/data/productosIniciales'

export default function App() {
  const [productos, setProductos] = useState(PRODUCTOS_INICIALES)
  const [mensaje, setMensaje] = useState(null)

  // El codigo nuevo sale del mayor que ya existe + 1, asi nunca se repite
  // aunque se registren productos uno detras de otro.
  const siguienteCodigo = (lista) =>
    lista.reduce((mayor, producto) => Math.max(mayor, producto.codigo), 0) + 1

  const registrar = (datos) => {
    const nuevo = { codigo: siguienteCodigo(productos), ...datos }
    setProductos((lista) => [...lista, nuevo])
    setMensaje('Producto registrado con el codigo ' + nuevo.codigo + ': ' + nuevo.descripcion + '.')
  }

  return (
    <div className="min-h-screen bg-muted/40 py-8">
      <div className="mx-auto w-full max-w-5xl px-4">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">Gestion de productos</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Prototipo en React con datos simulados en memoria. Al recargar la pagina se vuelve
            al catalogo inicial.
          </p>
        </header>

        {mensaje && (
          <div
            role="status"
            className="mb-6 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            {mensaje}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <FormularioProducto onRegistrar={registrar} />
          <ListaProductos productos={productos} />
        </div>
      </div>
    </div>
  )
}
