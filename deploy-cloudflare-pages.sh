#!/bin/bash

# Get Deno
wget https://github.com/denoland/deno/releases/download/v1.9.2/deno-x86_64-unknown-linux-gnu.zip
unzip deno-x86_64-unknown-linux-gnu.zip

# Fix config
cp config/config.ts_TEMPLATE config/config.ts
sed -i 's/mode: "real"/mode: "fake-frontend"/g' config/config.ts

./deno run -A https://deno.land/x/aleph@v0.3.0-alpha.32/cli.ts build frontend --reload
