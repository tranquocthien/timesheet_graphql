#!/bin/sh
cd /app
yarn migrate:up --cwd=dist/db/
node dist/main.js