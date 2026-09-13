<?php
// api/admin/testar_login.php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once "../conexao.php";

require_once "../conexao.php";

$email = 'admin@ecolaco.com';
$senha = 'admin123';

echo "🔍 TESTE DE LOGIN ADMIN<br><br>";

// Verificar se a tabela existe
$sql_tabela = "SHOW TABLES LIKE 'administradores'";
$result_tabela = $conn->query($sql_tabela);

if ($result_tabela->num_rows === 0) {
    echo "❌ Tabela 'administradores' NÃO EXISTE!<br>";
    echo "Execute o SQL para criar a tabela primeiro.";
    exit;
}

echo "✅ Tabela 'administradores' existe.<br><br>";

// Buscar usuário
$sql = "SELECT * FROM administradores WHERE email = '$email'";
$result = $conn->query($sql);

if (!$result || $result->num_rows === 0) {
    echo "❌ Usuário '$email' NÃO ENCONTRADO!<br>";
    echo "Execute o SQL para inserir o administrador.";
    exit;
}

$admin = $result->fetch_assoc();

echo "📧 Email: " . $admin['email'] . "<br>";
echo "👤 Nome: " . $admin['nome'] . "<br>";
echo "🔑 Hash no banco: " . $admin['senha'] . "<br>";
echo "📊 Ativo: " . ($admin['ativo'] ? 'SIM' : 'NÃO') . "<br><br>";

// Verificar senha
if (password_verify($senha, $admin['senha'])) {
    echo "✅ SENHA CORRETA!<br>";
    echo "O login deve funcionar!";
} else {
    echo "❌ SENHA INCORRETA!<br>";
    echo "Vamos gerar um novo hash...<br><br>";
    
    $novo_hash = password_hash($senha, PASSWORD_DEFAULT);
    $sql_update = "UPDATE administradores SET senha = '$novo_hash' WHERE email = '$email'";
    
    if ($conn->query($sql_update)) {
        echo "✅ Senha atualizada!<br>";
        echo "Novo hash: $novo_hash<br>";
        echo "Tente fazer login novamente.";
    } else {
        echo "❌ Erro ao atualizar: " . $conn->error;
    }
}