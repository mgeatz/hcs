#!/usr/bin/env bash

# Runs once daily
# Checks the Use% of the partition at /dev/sdc1

# When Use% >= 70% this script will execute bash ~/hcs/move/mvTrayThreeToTrayFour.sh

STR="$(df -h /tray3)"

node ~/Documents/hcs/jobs/keep/createWarningFile.js "${STR}" 70 "tray3"

if [ ! -f ~/Documents/hcs/jobs/keep/warn_tray3_70.txt ]; then
  echo "Tray 3 All Clear :)"
else
  echo "warn_tray3_70.txt file was found ... execute propagation sequence."
  bash /etc/cron.weekly/mvTrayThreeToTrayFour.sh
fi