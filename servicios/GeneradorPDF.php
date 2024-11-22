<?php
// Referencia al espacio de nombres de Dompdf
use Dompdf\Dompdf;

require '../vendor/autoload.php';

class GeneradorPDF
{
    public static function GeneradorPDF($pedido) {
        // Crea la plantilla del pedido en HTML
        $plantilla = '
        <h1>Pedido de Kebabs Nº '. $pedido->id.'</h1>
        <h2>Dirección: '.$pedido->direccion.'</h2>
        <table border="1" cellpadding="5" cellspacing="0">
            <tr>
                <th>Kebab</th>
                <th>Cantidad</th>
                <th>Precio Unidad</th>
                <th>Total</th>
            </tr>
            ';
        
        $cantidad = 0;
        foreach ($pedido->lineas as $linea) {
            $descripcion = $linea->kebab->descripcion;
            $cantidad += $linea->cantidad; // Acumula la cantidad de kebabs
            $plantilla .=
            '<tr>
                <td>'.$linea->nombre_kebab.'</td>
                <td>'.$linea->cantidad.'</td>
                <td>'.$linea->precio.'</td>
                <td>'.$linea->total.'</td>
            </tr>';
        }

        // Agregar total de unidades y precio total
        $plantilla .= '<tr>
                <td>Total unidades</td>
                <td>'.$cantidad.'</td>
                <td>Precio total</td>
                <td>'.$pedido->importe.'</td>
            </tr>
            ';

        // Instancia y uso de Dompdf
        $dompdf = new Dompdf();
        $dompdf->loadHtml($plantilla);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        // Devuelve el contenido del PDF generado
        return $dompdf->output();
    }
}

