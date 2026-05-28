<?php
$data = json_encode(['username' => 'admin', 'password' => 'admin123']);
$options = [
    'http' => [
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => $data,
    ]
];
$context  = stream_context_create($options);
$result = file_get_contents('http://localhost:8080/jugadores/login', false, $context);
echo "Result: " . $result . "\n";
