#!/usr/bin/env bash

# Runs once daily
# Checks the Use% of the partition at /dev/sdb1

# When Use% >= 70% this script will execute bash ~/hcs/move/mvTrayTwoToTrayThree.sh

STR="$(df -h /tray2)"

node ~/Documents/hcs/jobs/keep/createWarningFile.js "${STR}" 70 "tray2"

if [ ! -f ~/Documents/hcs/jobs/keep/warn_tray2_70.txt ]; then
  echo "Tray 2 All Clear :)"
else
  echo "warn_tray2_70.txt file was found ... execute propagation sequence."
  bash /etc/cron.weekly/mvTrayTwoToTrayThree.sh
fi