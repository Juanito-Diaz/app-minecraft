<?php
$pdo = new PDO('mysql:host=127.0.0.1;dbname=minecraftdb', 'root', 'root');
$stmt = $pdo->query("SELECT id, username, access_token, rol FROM jugadores");
print_r($stmt->fetchAll(PDO::FETCH_ASSOC));
