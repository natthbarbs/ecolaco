<?php
// api/cidades.php

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

require_once "conexao.php";

$sql = "SELECT id, nome, latitude, longitude, tem_info FROM cidade ORDER BY nome";

$resultado = $conn->query($sql);

if (!$resultado) {
    echo json_encode([
        'error' => 'Erro na consulta: ' . $conn->error
    ]);
    exit;
}

$cidades = [];
while ($cidade = $resultado->fetch_assoc()) {
    // Garantir que os valores numéricos sejam convertidos corretamente
    $cidade['id'] = (int)$cidade['id'];
    $cidade['latitude'] = (float)$cidade['latitude'];
    $cidade['longitude'] = (float)$cidade['longitude'];
    $cidade['tem_info'] = (int)$cidade['tem_info'];
    $cidades[] = $cidade;
}

echo json_encode($cidades, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);