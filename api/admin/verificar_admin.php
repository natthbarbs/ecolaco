<?php
// api/admin/verificar_admin.php

header('Content-Type: application/json; charset=UTF-8');

session_start();

if (!isset($_SESSION['admin_id'])) {
    echo json_encode(['autenticado' => false]);
    exit;
}

echo json_encode([
    'autenticado' => true,
    'admin_id' => $_SESSION['admin_id'],
    'admin_nome' => $_SESSION['admin_nome']
]);