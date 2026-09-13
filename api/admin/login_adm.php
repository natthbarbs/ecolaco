<?php
// api/admin/login_adm.php

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

require_once "../conexao.php";

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Método não permitido.']);
    exit;
}

$dados = json_decode(file_get_contents('php://input'), true);

if (!isset($dados['email']) || !isset($dados['senha'])) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'E-mail e senha são obrigatórios.']);
    exit;
}

$email = $conn->real_escape_string(trim($dados['email']));
$senha = $dados['senha'];

$sql = "SELECT * FROM administradores WHERE email = '$email' AND ativo = 1 LIMIT 1";
$resultado = $conn->query($sql);

if (!$resultado || $resultado->num_rows === 0) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'E-mail ou senha incorretos.']);
    exit;
}

$admin = $resultado->fetch_assoc();

if (!password_verify($senha, $admin['senha'])) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'E-mail ou senha incorretos.']);
    exit;
}

session_start();
$_SESSION['admin_id'] = $admin['id'];
$_SESSION['admin_nome'] = $admin['nome'];
$_SESSION['admin_email'] = $admin['email'];

echo json_encode([
    'sucesso' => true,
    'mensagem' => 'Login realizado com sucesso!',
    'dados' => [
        'id' => $admin['id'],
        'nome' => $admin['nome']
    ]
]);