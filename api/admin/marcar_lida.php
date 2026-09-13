<?php
// api/admin/marcar_lida.php

header('Content-Type: application/json; charset=UTF-8');
session_start();

if (!isset($_SESSION['admin_id'])) {
    echo json_encode(['error' => 'Não autenticado']);
    exit;
}

require_once "../conexao.php";

$dados = json_decode(file_get_contents('php://input'), true);

if (!isset($dados['id'])) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'ID não informado']);
    exit;
}

$id = intval($dados['id']);
$admin_id = $_SESSION['admin_id'];

$sql = "UPDATE notificacoes SET lida = 1 
        WHERE id = $id AND usuario_id = $admin_id AND tipo_usuario = 'admin'";

if ($conn->query($sql)) {
    echo json_encode(['sucesso' => true]);
} else {
    echo json_encode(['sucesso' => false, 'mensagem' => $conn->error]);
}