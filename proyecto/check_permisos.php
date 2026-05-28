<?php
$pdo = new PDO('mysql:host=127.0.0.1;dbname=minecraftdb', 'root', 'root');
$stmt = $pdo->query('SELECT * FROM permiso');
print_r($stmt->fetchAll(PDO::FETCH_ASSOC));
