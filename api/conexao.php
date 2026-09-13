<?php
// api/conexao.php

$host = "sql104.infinityfree.com";
$usuario = "if0_42902232";
$senha = "a senha que você usa pra logar no InfinityFree";
$banco = "if0_42902232_EcoLacoBD";

// Ativar exibição de erros para debug
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli($host, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die(json_encode([
        'error' => 'Erro na conexão: ' . $conn->connect_error
    ]));
}

$conn->set_charset("utf8mb4");