#!/usr/bin/env bash

# Runs once daily
# Checks the Use% of the partition at /dev/sde1

# if backup drive Use% is >= 60% send INFO email - add additional disk space

# if backup drive Use% is >= 70% send WARNING email - add additional disk space

# if backup drive Use% is >= 80% send ALERT email - add additional disk space

# if backup drive Use% is >= 90% shut down application until additional disk space is added