@echo off
echo ========================================
echo BACKUP AUTOMATICO - ECOLACO
echo ========================================

:: Definir variáveis
set DATA=%date:~6,4%-%date:~3,2%-%date:~0,2%
set HORA=%time:~0,2%%time:~3,2%%time:~6,2%
set HORA=%HORA: =0%

set PASTA_BACKUP=C:\xampp\htdocs\EcoLaço\backups
set ARQUIVO_BACKUP=%PASTA_BACKUP%\ecolaco_%DATA%_%HORA%.sql

:: Criar pasta se não existir
if not exist "%PASTA_BACKUP%" mkdir "%PASTA_BACKUP%"

:: Executar backup
echo Gerando backup...
"C:\xampp\mysql\bin\mysqldump" -u root ecolaco > "%ARQUIVO_BACKUP%"

:: Verificar se deu certo
if %errorlevel% == 0 (
    echo ✅ Backup criado com sucesso!
    echo 📁 %ARQUIVO_BACKUP%
) else (
    echo ❌ Erro ao criar backup!
    echo Verifique se o MySQL está rodando.
)

:: Manter apenas os últimos 10 backups
echo.
echo Removendo backups antigos...
cd "%PASTA_BACKUP%"
for /f "skip=10 delims=" %%i in ('dir /b /o-d *.sql') do (
    del "%%i"
    echo 🗑️ Removido: %%i
)

echo.
echo ========================================
echo Backup finalizado!
echo ========================================
pause