<?php
// api/prefeituras/historico_completo.php

header('Content-Type: application/json; charset=UTF-8');
session_start();

if (!isset($_SESSION['prefeitura_id'])) {
    echo json_encode(['error' => 'Não autenticado']);
    exit;
}

require_once "../conexao.php";

$prefeitura_id = intval($_SESSION['prefeitura_id']);
$filtro = isset($_GET['filtro']) && $_GET['filtro'] !== 'todos' ? $_GET['filtro'] : null;

$sql = "SELECT tipo, descricao, status, observacao_admin, 
        DATE_FORMAT(criado_em, '%d/%m/%Y %H:%i') as data
        FROM historico_envios 
        WHERE prefeitura_id = $prefeitura_id";

if ($filtro) {
    $sql .= " AND status = '$filtro'";
}

$sql .= " ORDER BY criado_em DESC LIMIT 50";

$result = $conn->query($sql);
$historico = [];

while ($row = $result->fetch_assoc()) {
    $historico[] = $row;
}

echo json_encode(['historico' => $historico]);