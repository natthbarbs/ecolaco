<?php
// api/admin/detalhes_prefeitura.php

header('Content-Type: application/json; charset=UTF-8');
session_start();

if (!isset($_SESSION['admin_id'])) {
    echo json_encode(['erro' => 'Não autenticado']);
    exit;
}

require_once "../conexao.php";

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id === 0) {
    echo json_encode(['erro' => 'ID inválido']);
    exit;
}

// Buscar prefeitura
$sql = "SELECT 
            p.*, 
            c.nome as cidade_nome,
            DATE_FORMAT(p.criado_em, '%d/%m/%Y %H:%i') as criado_em
        FROM prefeituras p
        LEFT JOIN cidade c ON p.cidade_id = c.id
        WHERE p.id = $id";

$result = $conn->query($sql);

if (!$result || $result->num_rows === 0) {
    echo json_encode(['erro' => 'Prefeitura não encontrada']);
    exit;
}

$prefeitura = $result->fetch_assoc();

// Buscar usuário
$sql_usuario = "SELECT email, ultimo_login FROM usuarios_prefeitura WHERE prefeitura_id = $id LIMIT 1";
$result_usuario = $conn->query($sql_usuario);
$usuario = $result_usuario->fetch_assoc();

echo json_encode([
    'prefeitura' => $prefeitura,
    'usuario' => $usuario
]);