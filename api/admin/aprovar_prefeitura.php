<?php
// api/admin/aprovar_prefeitura.php

header('Content-Type: application/json; charset=UTF-8');
session_start();

if (!isset($_SESSION['admin_id'])) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Não autenticado']);
    exit;
}

require_once "../conexao.php";

$dados = json_decode(file_get_contents('php://input'), true);

if (!isset($dados['id']) || !isset($dados['acao'])) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Dados inválidos']);
    exit;
}

$id = intval($dados['id']);
$acao = $dados['acao'];

if ($acao === 'aprovar') {
    $status = 'ativo';
    $mensagem = 'Prefeitura aprovada com sucesso!';
} else {
    $status = 'inativo';
    $mensagem = 'Prefeitura rejeitada.';
}

// Nome da prefeitura, usado na mensagem de notificação abaixo
$sqlNome = "SELECT nome FROM prefeituras WHERE id = $id";
$resultNome = $conn->query($sqlNome);
$nome = $resultNome && $resultNome->num_rows > 0 ? $resultNome->fetch_assoc()['nome'] : 'selecionada';

$sql = "UPDATE prefeituras SET status = '$status' WHERE id = $id";

if ($conn->query($sql)) {
    echo json_encode(['sucesso' => true, 'mensagem' => $mensagem]);
} else {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao atualizar: ' . $conn->error]);
}


require_once "gerar_notificacoes.php";

// Notificar o admin
gerarNotificacao(
    $_SESSION['admin_id'],
    'admin',
    'Prefeitura ' . ($acao === 'aprovar' ? 'Aprovada' : 'Rejeitada'),
    "A prefeitura $nome foi " . ($acao === 'aprovar' ? 'aprovada' : 'rejeitada') . ".",
    $acao === 'aprovar' ? 'sucesso' : 'erro'
);