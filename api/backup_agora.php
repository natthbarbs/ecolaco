<?php
// api/backup_agora.php

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Pasta de backups
$backup_dir = 'C:/xampp/htdocs/EcoLaço/backups/';

// Criar pasta se não existir
if (!is_dir($backup_dir)) {
    mkdir($backup_dir, 0777, true);
}

// Nome do arquivo
$data = date('Y-m-d_H-i-s');
$arquivo = $backup_dir . 'ecolaco_' . $data . '.sql';

// Comando de backup
$comando = 'C:/xampp/mysql/bin/mysqldump -u root ecolaco > "' . $arquivo . '"';

echo "🔍 Executando backup...<br>";
echo "📁 Comando: $comando<br><br>";

exec($comando, $output, $return_code);

if ($return_code === 0) {
    echo "✅ Backup criado com sucesso!<br>";
    echo "📁 Arquivo: " . basename($arquivo) . "<br>";
    echo "📊 Tamanho: " . number_format(filesize($arquivo) / 1024, 2) . " KB<br>";
    
    // Manter apenas últimos 10 backups
    $backups = glob($backup_dir . '*.sql');
    if (count($backups) > 10) {
        $backups_ordenados = array_reverse($backups);
        $remover = array_slice($backups_ordenados, 10);
        foreach ($remover as $arquivo_antigo) {
            unlink($arquivo_antigo);
            echo "🗑️ Removido: " . basename($arquivo_antigo) . "<br>";
        }
    }
} else {
    echo "❌ Erro ao criar backup!<br>";
    echo "Código: $return_code<br>";
    
    // Verificar se o MySQL está rodando
    exec('tasklist /FI "IMAGENAME eq mysqld.exe"', $task_output);
    if (empty($task_output)) {
        echo "<br>⚠️ O MySQL NÃO está rodando!<br>";
        echo "Inicie o MySQL no XAMPP e tente novamente.";
    }
}
?>