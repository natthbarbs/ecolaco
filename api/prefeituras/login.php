<?php
// api/prefeituras/login.php

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

require_once "../conexao.php";

// Verificar se é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Método não permitido.']);
    exit;
}

// Pegar dados
$dados = json_decode(file_get_contents('php://input'), true);

if (!isset($dados['email']) || !isset($dados['senha'])) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'E-mail e senha são obrigatórios.']);
    exit;
}

$email = $conn->real_escape_string(trim($dados['email']));
$senha = $dados['senha'];

// Buscar usuário
$sql = "SELECT 
            u.id, u.prefeitura_id, u.email, u.senha, u.ativo,
            p.nome as prefeitura_nome, p.status as prefeitura_status
        FROM usuarios_prefeitura u
        LEFT JOIN prefeituras p ON u.prefeitura_id = p.id
        WHERE u.email = '$email'
        LIMIT 1";

$resultado = $conn->query($sql);

if (!$resultado || $resultado->num_rows === 0) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'E-mail ou senha incorretos.']);
    exit;
}

$usuario = $resultado->fetch_assoc();

// Verificar se usuário está ativo
if ($usuario['ativo'] != 1) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Usuário desativado.']);
    exit;
}

// Verificar status da prefeitura
if ($usuario['prefeitura_status'] !== 'ativo') {
    echo json_encode([
        'sucesso' => false, 
        'mensagem' => '⚠️ Aguardando aprovação da equipe EcoLaço.'
    ]);
    exit;
}

// Verificar senha
if (!password_verify($senha, $usuario['senha'])) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'E-mail ou senha incorretos.']);
    exit;
}

// Atualizar último login
$sql_update = "UPDATE usuarios_prefeitura SET ultimo_login = NOW() WHERE id = " . $usuario['id'];
$conn->query($sql_update);

// Iniciar sessão
session_start();
$_SESSION['prefeitura_id'] = $usuario['prefeitura_id'];
$_SESSION['usuario_id'] = $usuario['id'];
$_SESSION['usuario_email'] = $usuario['email'];
$_SESSION['prefeitura_nome'] = $usuario['prefeitura_nome'];

echo json_encode([
    'sucesso' => true,
    'mensagem' => 'Login realizado com sucesso!',
    'dados' => [
        'prefeitura_id' => $usuario['prefeitura_id'],
        'nome' => $usuario['prefeitura_nome']
    ]
]);