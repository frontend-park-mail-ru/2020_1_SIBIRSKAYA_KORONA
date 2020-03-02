#!/bin/bash

BACKEND_DIR="/home/ubuntu/backend/"
FRONTEND_DIR="/home/ubuntu/frontend/"

echo "Run frontend"
cd $FRONTEND_DIR
git checkout deploy && git pull
npm install
./node_modules/.bin/forever stopall
./node_modules/.bin/forever start ./server/server.js
echo "Forntend is running"


echo "Run backend"
cd $BACKEND_DIR
git checkout deploy-test && git pull
kill -9 `pgrep "main"`
go build main.go
./main&
echo "Backend is running"
