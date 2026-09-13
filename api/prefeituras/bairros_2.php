<?php
// api/prefeituras/bairros_2.php
// API para o dashboard da prefeitura

header('Content-Type: application/json; charset=UTF-8');
session_start();

if (!isset($_SESSION['prefeitura_id'])) {
    echo json_encode(['error' => 'Não autenticado']);
    exit;
}

require_once "../conexao.php";

$prefeitura_id = intval($_SESSION['prefeitura_id']);

// Buscar cidade_id da prefeitura
$sql_cidade = "SELECT cidade_id FROM prefeituras WHERE id = $prefeitura_id";
$result = $conn->query($sql_cidade);
$cidade = $result->fetch_assoc();

if (!$cidade) {
    echo json_encode(['error' => 'Prefeitura não encontrada']);
    exit;
}

$cidade_id = $cidade['cidade_id'];

// Buscar bairros da cidade
$sql_bairros = "SELECT id, nome FROM bairro WHERE cidade_id = $cidade_id AND ativo = 1 ORDER BY nome";
$result = $conn->query($sql_bairros);
$bairros = [];

while ($row = $result->fetch_assoc()) {
    $bairros[] = $row;
}

// Buscar bairros já cadastrados com status
$sql_cadastrados = "SELECT 
                        b.id, 
                        b.nome, 
                        b.tipo_coleta, 
                        b.dia_coleta, 
                        b.horario,
                        CASE 
                            WHEN h.id IS NOT NULL AND h.status = 'aprovado' THEN 'aprovado'
                            WHEN h.id IS NOT NULL AND h.status = 'pendente' THEN 'pendente'
                            WHEN h.id IS NOT NULL AND h.status = 'rejeitado' THEN 'rejeitado'
                            ELSE 'aprovado'
                        END as status
                    FROM bairro b
                    LEFT JOIN historico_envios h ON h.prefeitura_id = $prefeitura_id 
                        AND h.descricao LIKE CONCAT('%', b.nome, '%')
                        AND h.tipo = 'coleta'
                    WHERE b.cidade_id = $cidade_id AND b.ativo = 1
                    GROUP BY b.id";

$result = $conn->query($sql_cadastrados);
$cadastrados = [];

while ($row = $result->fetch_assoc()) {
    $cadastrados[] = $row;
}

echo json_encode([
    'bairros' => $bairros,
    'cadastrados' => $cadastrados
]);