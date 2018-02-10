#!/usr/bin/env bash

# Runs once daily
# Checks the Use% of the partition at /dev/sdb1

# When Use% >= 70% this script will execute bash ~/hcs/move/mvTrayTwoToTrayThree.sh

STR="$(df -h)"

node ~/Documents/hcs/jobs/keep/createWarningFile.js "${STR}" 70 "tray1"

if [ ! -f ~/Documents/hcs/jobs/keep/warn_tray1_70.txt ]; then
  echo "All Clear :)"
else
  echo "warning.txt file was found ... execute propagation sequence."



fi