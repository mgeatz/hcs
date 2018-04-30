#!/usr/bin/env bash

# Runs once daily
# Checks the Use% of the partition at /dev/sdd1

# When Use% >= 70% this script will execute bash ~/hcs/move/mvTrayFourToBackup.sh

STR="$(df -h /tray4)"

node ~/Documents/hcs/jobs/keep/createWarningFile.js "${STR}" 70 "tray4"

if [ ! -f ~/Documents/hcs/jobs/keep/warn_tray4_70.txt ]; then
  echo "Tray 4 All Clear :)"
else
  echo "warn_tray4_70.txt file was found ... execute propagation sequence."
  bash /etc/cron.weekly/mvTrayFourToBackup.sh
fi