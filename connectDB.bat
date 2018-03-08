@echo off
start cmd /k mongod.exe --dbpath=%cd%\data\db --logpath=%cd%\data\logs\mongod.log