<?php
// api/prefeituras/verificar.php

header('Content-Type: application/json; charset=UTF-8');
session_start();

if (!isset($_SESSION['prefeitura_id'])) {
    echo json_encode(['autenticado' => false]);
    exit;
}

require_once "../conexao.php";

$prefeitura_id = intval($_SESSION['prefeitura_id']);

$sql = "SELECT 
            p.id, p.nome, p.status, p.email, p.telefone,
            c.nome as cidade_nome
        FROM prefeituras p
        LEFT JOIN cidade c ON p.cidade_id = c.id
        WHERE p.id = $prefeitura_id AND p.ativo = 1";

$resultado = $conn->query($sql);

if (!$resultado || $resultado->num_rows === 0) {
    session_destroy();
    echo json_encode(['autenticado' => false]);
    exit;
}

$prefeitura = $resultado->fetch_assoc();

// Buscar último login
$sql_login = "SELECT ultimo_login FROM usuarios_prefeitura WHERE prefeitura_id = $prefeitura_id ORDER BY ultimo_login DESC LIMIT 1";
$resultado_login = $conn->query($sql_login);
$ultimo_login = $resultado_login->fetch_assoc();

echo json_encode([
    'autenticado' => true,
    'prefeitura_id' => $prefeitura_id,
    'prefeitura_nome' => $prefeitura['nome'],
    'cidade_nome' => $prefeitura['cidade_nome'],
    'status' => $prefeitura['status'],
    'email' => $prefeitura['email'],
    'telefone' => $prefeitura['telefone'],
    'ultimo_login' => $ultimo_login['ultimo_login'] ?? null
]);