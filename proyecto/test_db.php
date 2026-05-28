<?php
try {
    $pdo = new PDO('mysql:host=localhost', 'root', '');
    $stmt = $pdo->query('SHOW DATABASES');
    $dbs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    print_r($dbs);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
