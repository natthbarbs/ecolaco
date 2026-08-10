<?php
// api/prefeituras/cadastro.php

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

require_once "../conexao.php";

// Verificar se é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Método não permitido.']);
    exit;
}

// Validar campos obrigatórios
$campos = ['nome', 'cidade', 'cnpj', 'email', 'usuario_email', 'usuario_senha'];
foreach ($campos as $campo) {
    if (!isset($_POST[$campo]) || empty(trim($_POST[$campo]))) {
        echo json_encode(['sucesso' => false, 'mensagem' => "Campo '$campo' é obrigatório."]);
        exit;
    }
}

// Validar arquivo
if (!isset($_FILES['oficio']) || $_FILES['oficio']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Ofício de adesão é obrigatório.']);
    exit;
}

// Dados
$nome = $conn->real_escape_string(trim($_POST['nome']));
$cidade_id = intval($_POST['cidade']);
$cnpj = $conn->real_escape_string(trim($_POST['cnpj']));
$telefone = isset($_POST['telefone']) ? $conn->real_escape_string(trim($_POST['telefone'])) : '';
$email = $conn->real_escape_string(trim($_POST['email']));
$usuario_email = $conn->real_escape_string(trim($_POST['usuario_email']));
$usuario_senha = password_hash($_POST['usuario_senha'], PASSWORD_DEFAULT);

// Verificar se já existe prefeitura com este CNPJ ou email
$sql_check = "SELECT id FROM prefeituras WHERE cnpj = '$cnpj' OR email = '$email'";
$result_check = $conn->query($sql_check);

if ($result_check && $result_check->num_rows > 0) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Já existe uma prefeitura cadastrada com este CNPJ ou e-mail.']);
    exit;
}

// Processar arquivo
$upload_dir = '../../uploads/oficios/';
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

$extensao = pathinfo($_FILES['oficio']['name'], PATHINFO_EXTENSION);
$nome_arquivo = 'oficio_' . time() . '_' . uniqid() . '.' . $extensao;
$caminho_arquivo = $upload_dir . $nome_arquivo;

if (!move_uploaded_file($_FILES['oficio']['tmp_name'], $caminho_arquivo)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao enviar o ofício.']);
    exit;
}

// Inserir prefeitura
$sql = "INSERT INTO prefeituras 
        (cidade_id, nome, cnpj, email, telefone, logo, status, ativo, criado_em, atualizado_em) 
        VALUES 
        ($cidade_id, '$nome', '$cnpj', '$email', '$telefone', NULL, 'pendente', 1, NOW(), NOW())";

if (!$conn->query($sql)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao cadastrar prefeitura: ' . $conn->error]);
    exit;
}

$prefeitura_id = $conn->insert_id;

// Inserir usuário
$sql_usuario = "INSERT INTO usuarios_prefeitura 
                (prefeitura_id, email, senha, ultimo_login, ativo, criado_em, atualizado_em) 
                VALUES 
                ($prefeitura_id, '$usuario_email', '$usuario_senha', NULL, 1, NOW(), NOW())";

if (!$conn->query($sql_usuario)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao cadastrar usuário: ' . $conn->error]);
    exit;
}

echo json_encode([
    'sucesso' => true,
    'mensagem' => 'Cadastro solicitado com sucesso! Aguarde a análise da equipe EcoLaço.'
]);