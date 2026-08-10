<?php
// api/prefeituras/resumo.php

header('Content-Type: application/json; charset=UTF-8');
session_start();

if (!isset($_SESSION['prefeitura_id'])) {
    echo json_encode(['error' => 'Não autenticado']);
    exit;
}

require_once "../conexao.php";

$prefeitura_id = intval($_SESSION['prefeitura_id']);

// Total de bairros
$sql_bairros = "SELECT COUNT(*) as total FROM bairro WHERE cidade_id = (SELECT cidade_id FROM prefeituras WHERE id = $prefeitura_id) AND ativo = 1";
$result = $conn->query($sql_bairros);
$total_bairros = $result->fetch_assoc()['total'] ?? 0;

// Total de PEVs (vamos buscar da tabela futura)
$total_pevs = 0;

// Total de campanhas
$sql_campanhas = "SELECT COUNT(*) as total FROM campanhas WHERE prefeitura_id = $prefeitura_id";
$result = $conn->query($sql_campanhas);
$total_campanhas = $result->fetch_assoc()['total'] ?? 0;

// Total pendentes
$sql_pendentes = "SELECT COUNT(*) as total FROM historico_envios WHERE prefeitura_id = $prefeitura_id AND status = 'pendente'";
$result = $conn->query($sql_pendentes);
$total_pendentes = $result->fetch_assoc()['total'] ?? 0;

// Últimas atividades
$sql_atividades = "SELECT 
                        'envio' as tipo,
                        descricao,
                        status,
                        criado_em as data
                    FROM historico_envios 
                    WHERE prefeitura_id = $prefeitura_id 
                    ORDER BY criado_em DESC 
                    LIMIT 5";

$result = $conn->query($sql_atividades);
$atividades = [];

if ($result) {
    $icones = [
        'pendente' => 'fa-clock',
        'aprovado' => 'fa-check-circle',
        'rejeitado' => 'fa-times-circle'
    ];
    
    while ($row = $result->fetch_assoc()) {
        $atividades[] = [
            'titulo' => 'Envio de ' . $row['tipo'],
            'descricao' => $row['descricao'],
            'status' => $row['status'],
            'icone' => $icones[$row['status']] ?? 'fa-info-circle',
            'data' => date('d/m/Y H:i', strtotime($row['data']))
        ];
    }
}

echo json_encode([
    'total_bairros' => $total_bairros,
    'total_pevs' => $total_pevs,
    'total_campanhas' => $total_campanhas,
    'total_pendentes' => $total_pendentes,
    'ultimas_atividades' => $atividades
]);