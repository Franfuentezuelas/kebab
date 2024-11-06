<?php
require_once 'micargador.php';
var_dump (RepoDireccion::findByUsuarioID(1));

echo "empieza el kebap <br>";
echo "WEB en construccion";

$ingredientes=[];

//$ingre=[1,12,4,5,6];
//$ingre=[1,12,4,5];
$ingre=[1,12,4];
foreach ($ingre as $id) {
    $ingredientes[]=RepoIngrediente::findByID($id);
}

//echo "KEBAB personalizado 2 con lechuga, cebolla y tomate <br>";
//$kebabPer= new Kebab(null,"personalizado del 2 con lechuga,cebolla y tomate",null,0,"personalizado del 2 con lechuga,cebolla y tomate",$ingredientes,2);

//echo "KEBAB personalizado 2 con lechuga y tomate <br>";
//$kebabPer= new Kebab(null,"personalizado del 2 con tomate",null,0,"personalizado del 2 con lechuga y tomate",$ingredientes,2);
echo "KEBAB personalizado 2 con lechuga y tomate <br>";
$kebabPer= new Kebab(null,"personalizado del 2 con tomate",null,0,"personalizado del 2 con lechuga y tomate",$ingredientes,2);


$kebabs = RepoKebab::getAll();
echo "TODOS LOS KEBAB <br>";

foreach ($kebabs as $kebab) {
    echo $kebab->toString()."<br>";
}
echo "<br>";
echo "kebabs terminados<br>";
echo "<br>";

echo"<br>";
echo"carta de la casa<br>";
$carta = RepoKebab::getCarta();
foreach ($carta as $kebab) {
    echo $kebab->toString()."<br>";
}

class Principal
{
    public static function main()
    {
        var_dump($_SERVER["DOCUMENT_ROOT"]);
        require_once 'micargador.php';
        //require_once './helper/sesion.php';
        require_once './Vistas/Principal/layout.php';

    }
}
Principal::main();

?>