@echo off
REM Script para baixar temperatura e umidade do site para o Salamandra
REM Coloque este arquivo em uma pasta e configure o Agendador de Tarefas do Windows
REM para executar a cada 5 minutos

REM Caminho onde o arquivo sera salvo (ajuste conforme necessario)
set "ARQUIVO_DESTINO=C:\Salamandra\clima\currenweather.html"

REM URL do site (substitua pelo seu dominio quando publicar)
set "URL_CLIMA=https://dd54516f-2ab8-47de-b97b-bd98f34aab98-00-1pfqxd0j43m0.worf.replit.dev/clima"

REM Cria a pasta se nao existir
if not exist "C:\Salamandra\clima" mkdir "C:\Salamandra\clima"

REM Baixa o arquivo usando PowerShell
powershell -Command "(New-Object Net.WebClient).DownloadFile('%URL_CLIMA%', '%ARQUIVO_DESTINO%')"

echo Clima atualizado em %date% %time%
