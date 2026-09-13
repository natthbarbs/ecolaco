<?php
// api/config_email.php

// Configurações do servidor de e-mail
define('EMAIL_HOST', 'smtp.gmail.com');      // Servidor SMTP
define('EMAIL_PORT', 587);                   // Porta (587 para TLS)
define('EMAIL_USER', 'seuemail@gmail.com');  // Seu e-mail
define('EMAIL_PASS', 'sua_senha_app');       // Senha de app do Gmail
define('EMAIL_FROM', 'seuemail@gmail.com');  // E-mail de origem
define('EMAIL_FROM_NAME', 'EcoLaço - Coleta Seletiva');
define('EMAIL_ADMIN', 'admin@ecolaco.com');  // E-mail do admin

// Configuração de SMTP
define('EMAIL_SMTP_AUTH', true);
define('EMAIL_SMTP_SECURE', 'tls');