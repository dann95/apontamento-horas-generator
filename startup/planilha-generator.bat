@echo off

REM Get the directory of the batch script
set SCRIPT_DIR=%~dp0

REM Run node with arguments
node "%SCRIPT_DIR%..\index.js" %1 %2 %3 %4 %5 %6 --color
