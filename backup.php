<?php
// backup.php - Executar diariamente

$backup_dir = 'C:/xampp/htdocs/EcoLaço/backups/';
if (!is_dir($backup_dir)) {
    mkdir($backup_dir, 0777, true);
}

$data = date('Y-m-d_H-i-s');
$arquivo = $backup_dir . 'ecolaco_' . $data . '.sql';

// Comando de backup
$comando = "C:/xampp/mysql/bin/mysqldump -u root ecolaco > $arquivo";
exec($comando);

// Manter apenas os últimos 10 backups
$backups = glob($backup_dir . '*.sql');
if (count($backups) > 10) {
    array_shift($backups);
    foreach ($backups as $backup_antigo) {
        unlink($backup_antigo);
    }
}

echo "Backup criado: $arquivo";
?>