#!/usr/bin/env bash

# Move monitoring scripts to daily crontab
mv ./monitor/backupUse.sh /etc/cron.daily
mv ./monitor/diskSpaceInfoCheck.sh /etc/cron.daily
mv ./monitor/trayOneUse.sh /etc/cron.daily
mv ./monitor/trayTwoUse.sh /etc/cron.daily
mv ./monitor/trayThreeUse.sh /etc/cron.daily
mv ./monitor/trayFourUse.sh /etc/cron.daily

# Move propagating scripts to respective crontab
mv ./propagate/mvTrayFourToBackup.sh /etc/cron.weekly
mv ./propagate/mvTrayOneToTrayTwo.sh /etc/cron.weekly
mv ./propagate/mvTrayTwoToTrayThree.sh /etc/cron.weekly
mv ./propagate/mvTrayThreeToTrayFour.sh /etc/cron.monthly

chmod -R 755 /etc/cron.daily
chmod -R 755 /etc/cron.weekly
chmod -R 755 /etc/cron.monthly
