<?php
// api/admin/estatisticas.php

header('Content-Type: application/json; charset=UTF-8');
session_start();

if (!isset($_SESSION['admin_id'])) {
    echo json_encode(['error' => 'Não autenticado']);
    exit;
}

require_once "../conexao.php";

// Total de prefeituras
$sql = "SELECT COUNT(*) as total FROM prefeituras";
$result = $conn->query($sql);
$total_prefeituras = $result->fetch_assoc()['total'] ?? 0;

// Total pendentes
$sql = "SELECT COUNT(*) as total FROM prefeituras WHERE status = 'pendente'";
$result = $conn->query($sql);
$total_pendentes = $result->fetch_assoc()['total'] ?? 0;

// Total de dados enviados (histórico)
$sql = "SELECT COUNT(*) as total FROM historico_envios WHERE status = 'pendente'";
$result = $conn->query($sql);
$total_dados = $result->fetch_assoc()['total'] ?? 0;

// Total de cidades
$sql = "SELECT COUNT(*) as total FROM cidade";
$result = $conn->query($sql);
$total_cidades = $result->fetch_assoc()['total'] ?? 0;

echo json_encode([
    'total_prefeituras' => $total_prefeituras,
    'total_pendentes' => $total_pendentes,
    'total_dados' => $total_dados,
    'total_cidades' => $total_cidades
]);