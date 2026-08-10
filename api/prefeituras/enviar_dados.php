<?php
// api/prefeituras/enviar_coleta.php

header('Content-Type: application/json; charset=UTF-8');
session_start();

if (!isset($_SESSION['prefeitura_id'])) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Não autenticado']);
    exit;
}

require_once "../conexao.php";

$dados = json_decode(file_get_contents('php://input'), true);

if (!$dados) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Dados inválidos']);
    exit;
}

$prefeitura_id = intval($_SESSION['prefeitura_id']);
$bairro_id = intval($dados['bairro_id']);
$tipo = $conn->real_escape_string($dados['tipo']);
$dias = $conn->real_escape_string($dados['dias']);
$horario = isset($dados['horario']) ? $conn->real_escape_string($dados['horario']) : null;
$observacao = isset($dados['observacao']) ? $conn->real_escape_string($dados['observacao']) : null;

// Buscar nome do bairro
$sql_bairro = "SELECT nome FROM bairro WHERE id = $bairro_id";
$result = $conn->query($sql_bairro);
$bairro = $result->fetch_assoc();

if (!$bairro) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Bairro não encontrado']);
    exit;
}

// Atualizar bairro
$sql_update = "UPDATE bairro 
                SET tipo_coleta = '$tipo', dia_coleta = '$dias', horario = '$horario', observacao = '$observacao' 
                WHERE id = $bairro_id";

if (!$conn->query($sql_update)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao atualizar bairro: ' . $conn->error]);
    exit;
}

// Registrar no histórico
$descricao = "Atualização de coleta: {$bairro['nome']} - $tipo - $dias";
$sql_historico = "INSERT INTO historico_envios (prefeitura_id, tipo, descricao, status) 
                    VALUES ($prefeitura_id, 'coleta', '$descricao', 'pendente')";

$conn->query($sql_historico);

echo json_encode([
    'sucesso' => true,
    'mensagem' => 'Informações de coleta enviadas para aprovação'
]);