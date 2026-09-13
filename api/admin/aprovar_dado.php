<?php
// api/admin/aprovar_dado.php

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
    $status = 'aprovado';
    $mensagem = 'Dado aprovado com sucesso!';
} else {
    $status = 'rejeitado';
    $mensagem = 'Dado rejeitado.';
}


require_once "gerar_notificacoes.php";

// Notificar o admin
gerarNotificacao(
    $_SESSION['admin_id'],
    'admin',
    'Dado ' . ($acao === 'aprovar' ? 'Aprovado' : 'Rejeitado'),
    "Um dado do tipo foi " . ($acao === 'aprovar' ? 'aprovado' : 'rejeitado') . ".",
    $acao === 'aprovar' ? 'sucesso' : 'erro'
);

// Buscar o item para saber se ele referencia um registro em outra tabela
// (ex: um envio de indicadores ambientais referencia uma linha em
// indicadores_ambientais — aprovar/rejeitar aqui reflete o status lá também).
$sqlBusca = "SELECT referencia_tabela, referencia_id FROM historico_envios WHERE id = $id";
$resultBusca = $conn->query($sqlBusca);
$item = $resultBusca ? $resultBusca->fetch_assoc() : null;

// Tabelas às quais é permitido propagar o status (lista branca por segurança)
$tabelasPermitidas = ['indicadores_ambientais'];

if ($item && $item['referencia_tabela'] && $item['referencia_id'] && in_array($item['referencia_tabela'], $tabelasPermitidas, true)) {
    $referenciaTabela = $item['referencia_tabela'];
    $referenciaId = intval($item['referencia_id']);
    $conn->query("UPDATE `$referenciaTabela` SET status = '$status' WHERE id = $referenciaId");
}

// Atualizar o status no histórico
$sql = "UPDATE historico_envios SET status = '$status' WHERE id = $id";

if ($conn->query($sql)) {
    echo json_encode(['sucesso' => true, 'mensagem' => $mensagem]);
} else {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao atualizar: ' . $conn->error]);
}