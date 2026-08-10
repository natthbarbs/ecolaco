<?php
// api/conexao.php

$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "ecolaco";

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