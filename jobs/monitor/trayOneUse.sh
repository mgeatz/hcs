#!/usr/bin/env bash

# Runs once daily
# Checks the Use% of the partition at /dev/sda1

# When Use% >= 70% this script will execute `bash mvTrayOneToTrayTwo.sh`

STR="$(df -h /tray1)"

node ~/Documents/hcs/jobs/keep/createWarningFile.js "${STR}" 70 "tray1"

if [ ! -f ~/Documents/hcs/jobs/keep/warn_tray1_70.txt ]; then
  echo "Tray 1 All Clear :)"
else
  echo "warn_tray1_70.txt file was found ... execute propagation sequence."
  bash /etc/cron.weekly/mvTrayOneToTrayTwo.sh
fi