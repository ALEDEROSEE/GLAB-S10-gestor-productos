import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const soles = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' })

export default function ListaProductos({ productos }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos registrados</CardTitle>
        <CardDescription>
          {productos.length} producto{productos.length === 1 ? '' : 's'} en el catalogo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Codigo</TableHead>
                <TableHead>Descripcion</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead>Categoria</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productos.map((producto) => (
                <TableRow key={producto.codigo}>
                  <TableCell className="font-medium">{producto.codigo}</TableCell>
                  <TableCell>{producto.descripcion}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {soles.format(producto.precio)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{producto.categoria}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
