<?php
// api/admin/gerar_notificacao.php

function gerarNotificacao($usuario_id, $tipo_usuario, $titulo, $mensagem, $tipo = 'info', $link = null) {
    global $conn;
    
    $sql = "INSERT INTO notificacoes (usuario_id, tipo_usuario, titulo, mensagem, tipo, link) 
            VALUES ($usuario_id, '$tipo_usuario', '$titulo', '$mensagem', '$tipo', '$link')";
    
    return $conn->query($sql);
}
?>