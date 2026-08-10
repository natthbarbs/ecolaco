<?php
// api/prefeituras/teste_auth.php

header('Content-Type: application/json; charset=UTF-8');
session_start();

echo json_encode([
    'session' => $_SESSION,
    'prefeitura_id' => $_SESSION['prefeitura_id'] ?? 'não definido',
    'prefeitura_nome' => $_SESSION['prefeitura_nome'] ?? 'não definido'
]);