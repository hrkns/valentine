start "ionic application" /max cmd /k "cd ionic & ionic serve"
timeout /t 1
start "repositorio" /max cmd /k "cls & git status"
timeout /t 1
%UserProfile%\AppData\Local\Postman\Postman.exe
start "" "https://github.com/hrkns/valentine"
start "" "https://console.firebase.google.com/u/0/project/valentine-913e5/functions/list"
start "" "https://console.firebase.google.com/u/0/project/valentine-913e5/database/firestore/data~2Fwork-periods-start-date"
code %~dp0