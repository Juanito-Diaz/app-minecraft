<?php
$pdo = new PDO('mysql:host=127.0.0.1;dbname=minecraftdb', 'root', 'root');
$sql = "
TRUNCATE TABLE permiso;
INSERT INTO `permiso` (`per_vista`, `per_rol`) VALUES 
('tabs', 'jugador, admin'),
('welcome', 'jugador, admin'),
('mundos-listado', 'jugador, admin'),
('mundos-detalle/:id', 'jugador, admin'),
('mundos-crear', 'jugador, admin'),
('mundos-eliminar', 'jugador, admin'),
('jugadores-listado', 'admin'),
('jugadores-detalle/:id', 'jugador, admin'),
('jugadores-crear', 'admin'),
('jugadores-eliminar', 'admin'),
('inventarios-listado', 'jugador, admin'),
('inventarios-detalle/:id', 'jugador, admin'),
('inventarios-crear', 'jugador, admin'),
('inventarios-eliminar', 'jugador, admin'),
('items-listado', 'jugador, admin'),
('items-detalle/:id', 'jugador, admin'),
('items-crear', 'jugador, admin'),
('items-eliminar', 'jugador, admin'),
('biomas-listado', 'jugador, admin'),
('biomas-detalle/:id', 'jugador, admin'),
('biomas-crear', 'jugador, admin'),
('biomas-eliminar', 'jugador, admin'),
('mobs-listado', 'jugador, admin'),
('mobs-detalle/:id', 'jugador, admin'),
('mobs-crear', 'jugador, admin'),
('mobs-eliminar', 'jugador, admin');
";
$pdo->exec($sql);
$pdo->exec("UPDATE jugadores SET rol = 'admin' WHERE username = 'admin'");
echo "Permisos actualizados con éxito.\n";
