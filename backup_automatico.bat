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
if not exist "%PASTA_BACKUP%" (
    echo Criando pasta de backups...
    mkdir "%PASTA_BACKUP%"
)

:: Verificar se o MySQL está rodando
tasklist /FI "IMAGENAME eq mysqld.exe" 2>NUL | find /I /N "mysqld.exe">NUL
if "%ERRORLEVEL%"=="1" (
    echo ❌ MySQL NAO ESTA RODANDO!
    echo Inicie o MySQL no XAMPP e tente novamente.
    pause
    exit
)

:: Executar backup
echo Gerando backup...
echo Data: %DATA%
echo Hora: %HORA%
echo Arquivo: %ARQUIVO_BACKUP%

"C:\xampp\mysql\bin\mysqldump" -u root ecolaco > "%ARQUIVO_BACKUP%"

:: Verificar se deu certo
if %errorlevel% == 0 (
    echo ✅ Backup criado com sucesso!
    echo 📁 %ARQUIVO_BACKUP%
    echo 📊 Tamanho: 
    dir "%ARQUIVO_BACKUP%" | find ".sql"
) else (
    echo ❌ Erro ao criar backup!
    echo Verifique se o MySQL esta rodando.
)

:: Manter apenas os últimos 10 backups
echo.
echo Removendo backups antigos...
cd "%PASTA_BACKUP%"
for /f "skip=10 delims=" %%i in ('dir /b /o-d *.sql 2^>nul') do (
    del "%%i" 2>nul
    echo 🗑️ Removido: %%i
)

echo.
echo ========================================
echo Backup finalizado!
echo ========================================
pause