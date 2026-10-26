import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CATEGORIAS } from '@/data/productosIniciales'

const FORMULARIO_VACIO = { descripcion: '', precio: '', categoria: '' }

// Reglas del requisito 3: descripcion de 3 caracteres a mas,
// precio numerico mayor que cero y categoria obligatoria.
export function validar(valores) {
  const errores = {}
  if (valores.descripcion.trim().length < 3) {
    errores.descripcion = 'La descripcion es obligatoria y debe tener al menos 3 caracteres.'
  }
  const precio = Number(valores.precio)
  if (valores.precio.trim() === '' || Number.isNaN(precio) || precio <= 0) {
    errores.precio = 'El precio es obligatorio y debe ser un numero mayor que cero.'
  }
  if (!valores.categoria) {
    errores.categoria = 'Selecciona una categoria.'
  }
  return errores
}

export default function FormularioProducto({ onRegistrar }) {
  const [valores, setValores] = useState(FORMULARIO_VACIO)
  const [errores, setErrores] = useState({})

  const cambiar = (campo) => (evento) => {
    const valor = evento?.target ? evento.target.value : evento
    setValores((previo) => ({ ...previo, [campo]: valor }))
    // Al corregir un campo se borra su mensaje para no dejarlo colgado en pantalla.
    setErrores((previo) => ({ ...previo, [campo]: undefined }))
  }

  const enviar = (evento) => {
    evento.preventDefault()
    const encontrados = validar(valores)
    setErrores(encontrados)
    if (Object.keys(encontrados).length > 0) return

    onRegistrar({
      descripcion: valores.descripcion.trim(),
      precio: Number(valores.precio),
      categoria: valores.categoria,
    })
    setValores(FORMULARIO_VACIO)
  }

  const limpiar = () => {
    setValores(FORMULARIO_VACIO)
    setErrores({})
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrar producto</CardTitle>
        <CardDescription>Los campos marcados se validan antes de guardar.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={enviar} noValidate className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="descripcion">Descripcion</Label>
            <Input
              id="descripcion"
              placeholder="Ejemplo: Inca Kola 500 ml"
              value={valores.descripcion}
              onChange={cambiar('descripcion')}
              aria-invalid={Boolean(errores.descripcion)}
            />
            {errores.descripcion && (
              <p className="text-sm text-destructive" role="alert">{errores.descripcion}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="precio">Precio</Label>
            <Input
              id="precio"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={valores.precio}
              onChange={cambiar('precio')}
              aria-invalid={Boolean(errores.precio)}
            />
            {errores.precio && (
              <p className="text-sm text-destructive" role="alert">{errores.precio}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="categoria">Categoria</Label>
            <Select value={valores.categoria} onValueChange={cambiar('categoria')}>
              <SelectTrigger id="categoria" aria-invalid={Boolean(errores.categoria)}>
                <SelectValue placeholder="Selecciona una categoria" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIAS.map((categoria) => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errores.categoria && (
              <p className="text-sm text-destructive" role="alert">{errores.categoria}</p>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button type="submit" className="sm:flex-1">Registrar producto</Button>
            <Button type="button" variant="outline" className="sm:flex-1" onClick={limpiar}>
              Limpiar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
