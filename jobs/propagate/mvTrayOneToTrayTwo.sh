#!/usr/bin/env bash

SDB1="$(df -k /dev/sdb1)"

# create a backup
#cp /dev/sda1 /dev/sde1/tempTrayOne

  # mv resources from /tray<X> to /tray<X>
  #mv /dev/sda1 /dev/sdb1

  # validate they successfully been transferred
  #node ~/Documents/hcs/jobs/keep/validateCopy.js "${SDB1}" 70 "tray1"

  # remove them from the initial tray from which they were copied

