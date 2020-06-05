start "ionic application" /max cmd /k "ionic serve"
timeout /t 1
start "repositorio" /max cmd /k "cls & git status"
timeout /t 1
%UserProfile%\AppData\Local\Postman\Postman.exe
code %~dp0