<?php
// api/admin/notificacoes.php

header('Content-Type: application/json; charset=UTF-8');
session_start();

if (!isset($_SESSION['admin_id'])) {
    echo json_encode(['error' => 'Não autenticado']);
    exit;
}

require_once "../conexao.php";

$admin_id = $_SESSION['admin_id'];

// Buscar notificações não lidas
$sql = "SELECT * FROM notificacoes 
        WHERE usuario_id = $admin_id AND tipo_usuario = 'admin' AND lida = 0 
        ORDER BY criado_em DESC LIMIT 20";

$result = $conn->query($sql);
$notificacoes = [];

while ($row = $result->fetch_assoc()) {
    $notificacoes[] = $row;
}

echo json_encode([
    'total' => count($notificacoes),
    'notificacoes' => $notificacoes
]);