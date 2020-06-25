./kill.sh
pm2 start ./ionic/run.sh --name "valentine_ionic"
pm2 start ./api/run.sh --name "valentine_api"