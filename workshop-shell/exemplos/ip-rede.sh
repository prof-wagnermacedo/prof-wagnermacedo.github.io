#!/bin/bash
LANG=en ifconfig $1 | grep -o 'inet addr:[^ ]*' | grep -o '[0-9.]*'
