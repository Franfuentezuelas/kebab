<?php

class RepoDireccion implements RepoCrud
{
    public static function nuevo($direccion) {
        $con = Conexion::getConection();
        
        $sql = "INSERT INTO Direccion (via, numero, resto, puntoGPS, localidad_nombreloc, localidad_nombreprov, usuario_id) 
                VALUES (:via, :numero, :resto, :puntoGPS, :localidad_nombreloc, :localidad_nombreprov, :usuario_id)";
        
        $consulta = $con->prepare($sql);
        
        $parametros = [
            ':via' => $direccion->via,
            ':numero' => $direccion->numero,
            ':resto' => $direccion->resto,
            ':puntoGPS' => $direccion->puntoGPS,
            ':localidad_nombreloc' => $direccion->localidad_nombreloc,
            ':localidad_nombreprov' => $direccion->localidad_nombreprov,
            ':usuario_id' => $direccion->usuario_id
        ];

        if ($consulta->execute($parametros)) {
            $direccion->id = $con->lastInsertId();
        } else {
            $direccion = null;
        }
        return $direccion;
    }
    
    public static function findByID($id) {
        $con = Conexion::getConection();
        $sql = "SELECT * FROM Direccion WHERE id = :id";
        
        $consulta = $con->prepare($sql);
        $parametros = [':id' => $id];
        
        $consulta->execute($parametros);
        $dir = null;
        $fila = $consulta->fetch(PDO::FETCH_ASSOC);
        
        if ($fila) {
            $dir = new Direccion(
                $fila["id"],
                $fila["via"],
                $fila["numero"],
                $fila["resto"] ?? null,
                $fila["puntoGPS"] ?? null,
                $fila["localidad_nombreloc"],
                $fila["localidad_nombreprov"],
                $fila["usuario_id"]
            );
        }
        return $dir;
    }

    public static function findByObj($direccion) {
        $con = Conexion::getConection();
        $sql = "SELECT * FROM Direccion WHERE via = :via AND numero = :numero";
        
        $consulta = $con->prepare($sql);
        $parametros = [
            ':via' => $direccion->via,
            ':numero' => $direccion->numero
        ];
        
        $consulta->execute($parametros);
        $dir = null;
        $fila = $consulta->fetch(PDO::FETCH_ASSOC);
        
        if ($fila) {
            $dir = new Direccion(
                $fila["id"],
                $fila["via"],
                $fila["numero"],
                $fila["resto"] ?? null,
                $fila["puntoGPS"] ?? null,
                $fila["localidad_nombreloc"],
                $fila["localidad_nombreprov"],
                $fila["usuario_id"]
            );
        }
        return $dir;
    }

    public static function update($direccion) {
        $con = Conexion::getConection();
        $sql = "UPDATE Direccion SET via = :via, numero = :numero, resto = :resto, 
                puntoGPS = :puntoGPS, localidad_nombreloc = :localidad_nombreloc, 
                localidad_nombreprov = :localidad_nombreprov, usuario_id = :usuario_id WHERE id = :id";
        
        $consulta = $con->prepare($sql);
        
        $parametros = [
            ':id' => $direccion->id,
            ':via' => $direccion->via,
            ':numero' => $direccion->numero,
            ':resto' => $direccion->resto,
            ':puntoGPS' => $direccion->puntoGPS,
            ':localidad_nombreloc' => $direccion->localidad_nombreloc,
            ':localidad_nombreprov' => $direccion->localidad_nombreprov,
            ':usuario_id' => $direccion->usuario_id
        ];
        
        return $consulta->execute($parametros) ? $direccion : null;
    }

    public static function delete($direccion) {
        $con = Conexion::getConection();
        $sql = "DELETE FROM Direccion WHERE id = :id";
        
        $consulta = $con->prepare($sql);
        $parametros = [':id' => $direccion->id];
        
        return $consulta->execute($parametros);
    }

    public static function save($direccion) {
        $direccionExistente = self::findByObj($direccion);
        
        return $direccionExistente ? self::update($direccionExistente) : self::nuevo($direccion);
    }

    public static function getAll() {
        $con = Conexion::getConection();
        $direcciones = [];
        
        $sql = "SELECT * FROM Direccion";
        
        $consulta = $con->prepare($sql);
        $consulta->execute();
        
        while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
            $direcciones[] = new Direccion(
                $fila["id"],
                $fila["via"],
                $fila["numero"],
                $fila["resto"] ?? null,
                $fila["puntoGPS"] ?? null,
                $fila["localidad_nombreloc"],
                $fila["localidad_nombreprov"],
                $fila["usuario_id"]
            );
        }
        
        return $direcciones;
    }

    public static function findByUsuarioID($usuario_id) {
        $con = Conexion::getConection();
        $direcciones = [];
    
        $sql = "SELECT * FROM Direccion WHERE usuario_id = :usuario_id";
        
        $consulta = $con->prepare($sql);
        $parametros = [':usuario_id' => $usuario_id];
        
        $consulta->execute($parametros);
        
        while ($fila = $consulta->fetch(PDO::FETCH_ASSOC)) {
            $direcciones[] = new Direccion(
                $fila["id"],
                $fila["via"],
                $fila["numero"],
                $fila["resto"] ?? null,
                $fila["puntoGPS"] ?? null,
                $fila["localidad_nombreloc"],
                $fila["localidad_nombreprov"],
                $fila["usuario_id"]
            );
        }
        
        return $direcciones;
    }
}
