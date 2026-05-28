<?php
$pdo = new PDO('mysql:host=127.0.0.1;dbname=minecraftdb', 'root', 'root');
$sql = "
INSERT INTO `permiso` (`per_vista`, `per_rol`) VALUES 
('mundos-eliminar', 'admin'),
('jugadores-eliminar', 'admin'),
('inventarios-eliminar', 'jugador, admin'),
('items-eliminar', 'jugador, admin'),
('biomas-eliminar', 'jugador, admin'),
('mobs-eliminar', 'jugador, admin');
";
$pdo->exec($sql);
echo "Nuevos permisos de eliminar actualizados con éxito.\n";
