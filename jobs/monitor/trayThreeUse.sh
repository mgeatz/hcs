#!/usr/bin/env bash

# Runs once daily
# Checks the Use% of the partition at /dev/sdc1

# When Use% >= 70% this script will execute bash ~/hcs/move/mvTrayTwoToTrayThree.sh