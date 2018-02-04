#!/usr/bin/env bash

# Move to /etc/con.daily

# @description: Checks Use% of HCS dedicated partitions:
#   /dev/sda1 aka /tray1
#   /dev/sdb1 aka /tray2
#   /dev/sdc1 aka /tray3
#   /dev/sdd1 aka /tray4
#   /dev/sde1 aka /backup1

# Sends email with Use% and drive name

BODY="To: mgeatz01@gmail.com
From: michaelgeatz01@gmail.com
Subject: HCS Disk Use%

$(df /tray1)

$(df /tray2)

$(df /tray3)

$(df /tray4)

$(df /backup1)"


echo "$BODY" | ssmtp mgeatz01@gmail.com

echo "diskSpaceInfoCheck - Email Sent"
