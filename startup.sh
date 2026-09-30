#!/bin/sh
set -eu
if [ -d "/app/applet" ]; then
  cd /app/applet
elif [ -d "/workspace" ]; then
  cd /workspace
fi
node scripts/preview.mjs stop || true
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:3000/ || curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
npm run dev >>/tmp/app-startup.log 2>&1 &
