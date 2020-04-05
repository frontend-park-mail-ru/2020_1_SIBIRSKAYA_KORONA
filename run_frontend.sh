#!/bin/bash

FRONTEND_DIR="/home/ubuntu/frontend/"

echo "Run frontend"
cd $FRONTEND_DIR
git checkout deploy && git pull
npm install
./node_modules/.bin/forever stopall
./node_modules/.bin/forever start ./server/server.js
echo "Forntend is running"
