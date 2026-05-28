<?php
$data = json_encode(['username' => 'admin', 'password' => 'admin123', 'password_confirm' => 'admin123']);
$options = [
    'http' => [
        'header'  => "Content-type: application/json\r\n",
        'method'  => 'POST',
        'content' => $data,
        'ignore_errors' => true,
    ]
];
$context  = stream_context_create($options);
$result = file_get_contents('http://localhost:8080/jugadores/registrar', false, $context);
echo "Result: " . $result . "\n";
