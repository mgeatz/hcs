# Home Cloud Server
***Build your own Home Cloud Server file management system***

[![wercker status](https://app.wercker.com/status/964dec3fd408285f6127cac6320319de/m/ "wercker status")](https://app.wercker.com/project/byKey/964dec3fd408285f6127cac6320319de)

#### Format Partitions Dedicated To HCS
Follow the instructions:

1. Print current partition information: `lsblk`
2. Attach your first new drive to the HCS host machine
3. Re-print current partition information: `lsblk`
4. Find the new drive location (e.g., /dev/sda1)
5. Partition the new drive `fdisk /dev/sda1`
    * Enter `p` to create a new partition
    * Press the enter key to accept each of the default values presented
    * Enter `w` to save the partition
6. Format the new partition, enter `mkfs.ext4 -L tray1 /dev/sda1`
7. `vim etc/fstab`
8. Append `LABEL=TRAY1 /tray1 ext4  defaults 0 2` to the file
9. Check mounted paritions (enter `mount`) ... you should NOT see tray1 yet
10. Mount the new drive, enter `mount -a`
11. Check mounted partitions (enter `mount`) ... you SHOULD see tray1 now
12. Confirm your new drive space, enter `lsblk`
13. Repeat for subsequent drives.



#### Setup HCS Disk Health Check jobs And Tray Propagation Jobs 
Follow the instructions:

1. Configure SSMTP on your HCS host machine. SSMTP configuration management located at `cd ~/../../etc/ssmtp/ssmtp.config`. You can paste the example ssmtp.config below. 
2. Update each .sh script in the hcs/jobs directory with your preferred To and From email addresses. 
3. `cd` into the hcs/jobs directory and run `sudo bash relocateHCSjobs.sh`
4. `cd` into /etc/cron.daily run `crontab -e` and append the following 
```
0 0 * * * /etc/cron.daily/backupUse.sh
0 0 * * * /etc/cron.daily/diskSpaceInfoCheck.sh
0 0 * * * /etc/cron.daily/trayOneUse.sh
0 0 * * * /etc/cron.daily/trayTwoUse.sh
0 0 * * * /etc/cron.daily/trayThreeUse.sh
0 0 * * * /etc/cron.daily/trayFourUse.sh
```
7.Hit the ESC key and type `:wq`

8.`cd` into /etc/cron.weekly run `crontab -e` and append the following
```
0 0 * * * /etc/cron.weekly/mvTrayFourToBackup.sh
0 0 * * * /etc/cron.weekly/mvTrayOneToTrayTwo.sh
0 0 * * * /etc/cron.weekly/mvTrayTwoToTrayThree.sh
```
7.Hit the ESC key and type `:wq`

8.`cd` into /etc/cron.monthly run `crontab -e` and append the following
```
0 0 * * * /etc/cron.weekly/mvTrayThreeToTrayFour.sh
```

###### SSMTP Configs for your ssmtp.config file:

```
# ssmtp.config:
root=<YOUR EMAIL ADDRESS>
mailhub=smtp.gmail.com:587 
rewriteDomain=gmail.com 
AuthUser=<YOUR EMAIL ADDRESS>
AuthPass=<YOUR PASSWORD> 
FromLineOverride=YES 
UseStartTLS=YES 
UeTLS=YES
```

#### Personalize Your Home Cloud Server (HCS)
Follow the instructions:

1. Navigate to hcs/config directory.
2. Give the "hcsName" property a new value.
3. Grant IPs access to your HCS by updating the "whitelist" property.



#!/bin/sh

git clone https://github.com/mgeatz/AEM-Weather-App
git clone https://github.com/mgeatz/Alexa-Blue-Jean-Skill
git clone https://github.com/mgeatz/hcs.git
git clone https://github.com/mgeatz/Java-API.git
git clone https://github.com/mgeatz/java-blockchain.git
git clone https://github.com/mgeatz/LemurCode.git
git clone https://github.com/mgeatz/michaelgeatz.git
git clone https://github.com/mgeatz/phonegap-app-developer.git
git clone https://github.com/mgeatz/RESTUP.git
git clone https://github.com/mgeatz/skolvikes.git
git clone https://github.com/mgeatz/up.git

