#!/usr/bin/env bash

# Move monitoring scripts to daily crontab
cp ./monitor/backupUse.sh /etc/cron.daily
cp ./monitor/diskSpaceInfoCheck.sh /etc/cron.daily
cp ./monitor/trayOneUse.sh /etc/cron.daily
cp ./monitor/trayTwoUse.sh /etc/cron.daily
cp ./monitor/trayThreeUse.sh /etc/cron.daily
cp ./monitor/trayFourUse.sh /etc/cron.daily

# Move propagating scripts to respective crontab
cp ./propagate/mvTrayFourToBackup.sh /etc/cron.weekly
cp ./propagate/mvTrayOneToTrayTwo.sh /etc/cron.weekly
cp ./propagate/mvTrayTwoToTrayThree.sh /etc/cron.weekly
cp ./propagate/mvTrayThreeToTrayFour.sh /etc/cron.monthly