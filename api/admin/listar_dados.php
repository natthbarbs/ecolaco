<?php
// api/admin/listar_dados.php

header('Content-Type: application/json; charset=UTF-8');
session_start();

if (!isset($_SESSION['admin_id'])) {
    echo json_encode(['error' => 'Não autenticado']);
    exit;
}

require_once "../conexao.php";

$filtro = isset($_GET['filtro']) ? $_GET['filtro'] : 'todos';

$sql = "SELECT 
            h.id,
            h.tipo,
            h.descricao,
            h.status,
            h.observacao_admin,
            DATE_FORMAT(h.criado_em, '%d/%m/%Y %H:%i') as data_envio,
            p.nome as prefeitura_nome,
            p.id as prefeitura_id
        FROM historico_envios h
        LEFT JOIN prefeituras p ON h.prefeitura_id = p.id";

if ($filtro !== 'todos') {
    $sql .= " WHERE h.status = '$filtro'";
}

$sql .= " ORDER BY h.criado_em DESC";

$result = $conn->query($sql);
$dados = [];

while ($row = $result->fetch_assoc()) {
    // Definir ícone e cor baseado no tipo
    $icones = [
        'coleta' => '♻️',
        'pev' => '📍',
        'campanha' => '📢',
        'comunicado' => '📧',
        'indicador' => '📊'
    ];
    
    $row['icone'] = $icones[$row['tipo']] ?? '📄';
    $dados[] = $row;
}

echo json_encode(['dados' => $dados]);