#Node app init script
case "$1" in
	start)
		forever start --minUptime 1000 --spinSleepTime 1000 ./app.js
		;;
	stop)
		forever stop ./app.js
		;;
	restart)
		forever restart ./app.js
		;;
	*)
		echo ###partial###F878D52C-4618-4687-B80C-93A0D186A419quot;Usage: $0 {start|stop|restart|list}"
		exit 1

esac
exit 0
		
