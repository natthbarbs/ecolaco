<?php
// api/bairros.php

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

require_once "conexao.php";

if (!isset($_GET['cidade_id'])) {
    echo json_encode(['error' => 'cidade_id não informado.']);
    exit;
}

$cidade_id = intval($_GET['cidade_id']);

$sql = "SELECT 
            id, 
            cidade_id, 
            nome, 
            tipo_coleta, 
            dia_coleta, 
            horario, 
            observacao, 
            ativo 
        FROM bairro 
        WHERE cidade_id = $cidade_id 
        AND ativo = 1 
        ORDER BY nome";

$resultado = $conn->query($sql);

if (!$resultado) {
    echo json_encode(['error' => 'Erro na consulta: ' . $conn->error]);
    exit;
}

$bairros = [];
while ($bairro = $resultado->fetch_assoc()) {
    $bairros[] = $bairro;
}

echo json_encode($bairros, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);