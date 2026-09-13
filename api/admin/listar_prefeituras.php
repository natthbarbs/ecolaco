<?php
// api/admin/listar_prefeituras.php

header('Content-Type: application/json; charset=UTF-8');
session_start();

if (!isset($_SESSION['admin_id'])) {
    echo json_encode(['error' => 'Não autenticado']);
    exit;
}

require_once "../conexao.php";

$filtro = isset($_GET['filtro']) ? $_GET['filtro'] : 'todos';

$sql = "SELECT 
            p.id, p.nome, p.cnpj, p.email, p.telefone, p.status, p.ativo,
            c.nome as cidade_nome
        FROM prefeituras p
        LEFT JOIN cidade c ON p.cidade_id = c.id";

if ($filtro !== 'todos') {
    $sql .= " WHERE p.status = '$filtro'";
}

$sql .= " ORDER BY p.id DESC";

$result = $conn->query($sql);
$prefeituras = [];

while ($row = $result->fetch_assoc()) {
    $prefeituras[] = $row;
}

echo json_encode(['prefeituras' => $prefeituras]);