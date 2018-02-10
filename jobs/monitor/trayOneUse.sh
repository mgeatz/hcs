#!/usr/bin/env bash

# Runs once daily
# Checks the Use% of the partition at /dev/sda1

# When Use% >= 70% this script will execute `bash mvTrayOneToTrayTwo.sh`

STR="$(df -h)"

node ~/Documents/hcs/jobs/keep/createWarningFile.js "${STR}" 70 "tray1"

if [ ! -f ~/Documents/hcs/jobs/keep/warn_tray1_70.txt ]; then
  echo "All Clear :)"
else
  echo "warning.txt file was found ... execute propagation sequence."
  bash /etc/cron.weekly/mvTrayOneToTrayTwo.sh
fi